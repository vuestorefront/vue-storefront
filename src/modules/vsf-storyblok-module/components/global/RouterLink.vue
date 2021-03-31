<template>
  <router-link v-if="!isExternal" :to="url">
    <slot />
  </router-link>
  <a v-else :href="url" rel="noopener noreferrer">
    <slot />
  </a>
</template>

<script>
import { mapState } from 'vuex'
import config from 'config'
import get from 'lodash-es/get'

export default {
  name: 'StoryblokRouterLink',
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('storyblok', {
      storeCodeFromHeader: (state) => state.storeCode
    }),
    isExternal () {
      return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(this.link.cached_url || this.link.url)
    },
    url () {
      const formatUrl = url => this.isExternal ? url : (`/${url}`).replace(/^\/+/, '/')
      const url = formatUrl(this.link.cached_url || this.link.url)
      const addStoreCode = get(config, 'storyblok.settings.appendStoreCodeFromHeader')
      if (addStoreCode && this.storeCodeFromHeader && url.startsWith(`/${this.storeCodeFromHeader}/`)) {
        return url.replace(`/${this.storeCodeFromHeader}/`, '/')
      }
      return url
    }
  }
}
</script>
