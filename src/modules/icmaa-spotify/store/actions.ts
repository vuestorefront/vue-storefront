import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import { DataResolver } from '@vue-storefront/core/data-resolver/types/DataResolver'
import SpotifyState from '../types/SpotifyState'
import * as mutationTypes from './mutation-types'
import { cacheStorage as cache, storageKey } from '../'
import { isCategoryInWhitelist } from '../helpers'

import Axios from 'axios'
import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'

import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<SpotifyState, RootState> = {
  async fetchRelatedArtistsByName (context, name: string) {
    const { endpoint } = config.icmaa_spotify
    const apiUrl = endpoint + '/related-artists/' + encodeURIComponent(name)
    return Axios.get(processURLAddress(apiUrl))
      .then(resp => resp.data.result)
      .catch(() => [])
  },
  async fetchRelatedArtistsByCategory (context, category: Category): Promise<any> {
    if (!isCategoryInWhitelist(category)) {
      Logger.log('Not a child of parent category whitelist', 'icmaaSpotify')()
      return
    }

    const { id, name } = category
    const state = context.state

    const cacheKey = storageKey + '/' + id

    if (!state.relatedArtists || Object.keys(state.relatedArtists).length === 0 || !state.relatedArtists[id]) {
      if (await cache.getItem(cacheKey).then(item => item !== null)) {
        return cache.getItem(cacheKey).then(result => {
          context.commit(mutationTypes.ICMAA_SPOTIFY_RELATEDARTIST_ADD, result)
          return result
        })
      }

      const relatedArtists = await context.dispatch('fetchRelatedArtistsByName', name)

      const result = { categoryId: id, relatedArtists }
      context.commit(mutationTypes.ICMAA_SPOTIFY_RELATEDARTIST_ADD, result)
      return cache.setItem(cacheKey, result)
        .catch(error => Logger.error(error, 'icmaa-spotify'))
    } else {
      return new Promise((resolve, reject) => {
        let result = state.relatedArtists[id]
        if (result) {
          cache.setItem(cacheKey, { categoryId: id, relatedArtists: result })
            .catch(error => Logger.error(error, 'icmaa-spotify'))
          resolve(result)
        } else {
          reject('Error while fetching state for ' + name)
        }
      })
    }
  },
  async fetchRelatedArtists ({ getters, dispatch, rootGetters }, category: Category) {
    await dispatch('fetchRelatedArtistsByCategory', category)
    const relatedArtists = getters.getRelatedArtistsByCategoryId(category.id)

    /** Only load not already loaded categories (prevent invinite load of `category-next/loadCategories`) */
    const categoriesNotInState = relatedArtists.filter(a => !rootGetters['category-next/getCategories'].map(c => c.name).includes(a))

    /**
     * To make full-text search possible in elasticsearch we must search the "name.keyword" field of our field.
     * Otherwise it wont find any content because the originial "name" field is type "text"
     * and can't be searched on using "terms".
     */
    const categorySearchOptions: DataResolver.CategorySearchOptions = {
      filters: {
        'name.keyword': categoriesNotInState,
        'ceHasLogo': 'true'
      }
    }

    await dispatch('category-next/loadCategories', categorySearchOptions, { root: true })
  }
}

export default actions
