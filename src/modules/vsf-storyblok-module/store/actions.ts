import { StoryblokState } from '../types/State'
import { ActionTree, ActionContext } from 'vuex'
import config from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'
import qs from 'qs'

const fetchStory = async url => {
  const { result: story }: any = await TaskQueue.execute({
    url,
    payload: {
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    silent: true
  })
  return story
}

export const actions: ActionTree<StoryblokState, RootState> = {
  async ssrContext ({ commit, dispatch }, ssrContext) {
    const { request } = ssrContext.server
    if (request.headers['x-vs-store-code']) {
      dispatch('setStoreCode', request.headers['x-vs-store-code'])
    }
    const supportsWebp = request.headers.accept && request.headers.accept.includes('image/webp')
    commit('supportsWebp', supportsWebp)
  },
  async setStoreCode ({ commit, state }, storeCode) {
    commit('setStoreCode', storeCode)
  },
  async getPreviewToken ({ commit, state }, query) {
    if (state.previewToken) {
      return state.previewToken
    }

    const url = processURLAddress(`${config.storyblok.endpoint}/validate-editor/?${qs.stringify(query)}`)
    const { result: { previewToken } }: any = await TaskQueue.execute({
      url,
      silent: true
    })

    commit('setPreviewToken', { previewToken })
    return previewToken
  },
  async loadDraftStory ({ commit }: ActionContext<StoryblokState, RootState>, { id, previewToken }) {
    commit('loadingStory', { key: id })

    const { data: { story } } = await this['$storyblokClient'].get(`cdn/stories/${id}`, {
      token: previewToken,
      version: 'draft'
    })

    commit('setStory', { key: id, story })
    return story
  },
  async loadStory ({ commit, state }, { fullSlug: key }) {
    if (state.stories[key] && state.stories[key].loading) {
      // Already fetching this story
      return
    }
    commit('loadingStory', { key })

    const cachedStory = state.stories[key].story
    if (cachedStory) {
      return cachedStory
    }

    const url = processURLAddress(`${config.storyblok.endpoint}/story/${key}`.replace(/([^:]\/)\/+/g, '$1'))
    const story = await fetchStory(url)

    commit('setStory', { key, story })

    return story
  }
}
