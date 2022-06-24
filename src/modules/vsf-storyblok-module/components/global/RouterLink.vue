<template>
  <router-link
    v-if="!isExternal"
    :to="url"
    :target="shouldOpenInNewWindow ? '_blank' : '_self'"
  >
    <slot />
  </router-link>
  <a v-else
     :href="url"
     :target="shouldOpenInNewWindow ? '_blank' : '_self'"
  >
    <slot />
  </a>
</template>

<script>
import { mapGetters } from 'vuex'

import isUrlExternal from '../../helpers/is-url-external';
import getUrlFromLink from '../../helpers/get-url-from-link';

export default {
  name: 'StoryblokRouterLink',
  props: {
    link: {
      type: Object,
      required: true
    },
    isNewWindow: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      storeCodeFromHeader: 'storyblok/storeCode'
    }),
    isExternal () {
      return isUrlExternal(this.link.cached_url || this.link.url);
    },
    shouldOpenInNewWindow () {
      if (this.isNewWindow !== undefined) {
        return this.isNewWindow;
      }

      return this.isExternal;
    },
    url () {
      return getUrlFromLink(this.link, this.storeCodeFromHeader);
    }
  }
}
</script>
