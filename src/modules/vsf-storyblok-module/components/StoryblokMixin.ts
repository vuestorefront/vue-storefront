import config from 'config'
import { mapState } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { KEY } from '..'
import { StoryblokState } from '../types/State'
import { loadScript, getStoryblokQueryParams } from '../helpers'
import get from 'lodash-es/get'

export default {
  name: 'Storyblok',
  computed: {
    ...mapState(KEY, {
      loadingStory (state: StoryblokState) {
        const { id, fullSlug } = getStoryblokQueryParams(this.$route)

        const key = this.storyblokPath || id || this.formatFullSlug(fullSlug)
        return (state.stories[key] && state.stories[key].loading) || false
      },
      previewToken: (state: StoryblokState) => state.previewToken,
      storeCodeFromHeader: (state: StoryblokState) => state.storeCode,
      story (state: StoryblokState) {
        const { id, fullSlug } = getStoryblokQueryParams(this.$route)

        const key = this.storyblokPath || id || this.formatFullSlug(fullSlug)
        return state.stories[key] && state.stories[key].story
      },
      isStatic () {
        return !!this.storyblok.path
      },
      storyblokPath () {
        const {storeCode} = currentStoreView()
        const path = this.storyblok.path
        if (this.storyblok.prependStorecode && config.storeViews.multistore && storeCode) {
          return `${storeCode}/${path}`
        }
        return path
      }
    })
  },
  data () {
    return {
      storyblok: {
        prependStorecode: false,
        path: '',
        fetchStory: true
      }
    }
  },
  methods: {
    formatFullSlug (fullSlug: string) {
      const addStoreCode = get(config, 'storyblok.settings.appendStoreCodeFromHeader')
      const storeCodeToAdd = this.storeCodeFromHeader
      if (addStoreCode && storeCodeToAdd) {
        return `${storeCodeToAdd}/${fullSlug}`
      }
      return fullSlug
    },
    async fetchStory () {
      if (this.storyblok.fetchStory === false) {
        return
      }
      const { id, fullSlug, spaceId, timestamp, token } = getStoryblokQueryParams(this.$route)

      if (id && !this.storyblokPath) {
        const previewToken = await this.$store.dispatch(`${KEY}/getPreviewToken`, {
          spaceId,
          timestamp,
          token
        })

        if (previewToken) {
          return this.$store.dispatch(`${KEY}/loadDraftStory`, {
            id,
            previewToken
          })
        }
      }

      return this.$store.dispatch(`${KEY}/loadStory`, {
        fullSlug: this.storyblokPath || this.formatFullSlug(fullSlug)
      })
    }
  },
  async serverPrefetch () {
    const story = await this.fetchStory()
    return { story }
  },
  async asyncData ({ route, context }) {
    return new Promise((resolve) => {
      const { id } = getStoryblokQueryParams(route)
      if (context && !id) {
        context.output.cacheTags.add(KEY)
      }
      resolve()
    })
  },
  async mounted () {
    if (!this.story) {
      await this.fetchStory()
    }

    if (this.previewToken) {
      const url = `https://app.storyblok.com/f/storyblok-latest.js?t=${this.previewToken}`

      await loadScript(url, 'storyblok-javascript-bridge')

      window['storyblok'].on(['input', 'published', 'change'], (event: any) => {
        if (event.action === 'input') {
          this.$store.commit(`${KEY}/updateStory`, { key: event.story.id, story: event.story })
        } else if (!(event).slugChanged) {
          window.location.reload()
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (!this.isStatic && from.path !== to.path) {
        this.fetchStory()
      }
    }
  }
}
