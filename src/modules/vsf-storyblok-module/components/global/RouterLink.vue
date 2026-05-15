<template>
  <router-link
    v-if="!isExternal"
    :to="url"
    :target="shouldOpenInNewWindow ? '_blank' : '_self'"
    :rel="shouldOpenInNewWindow ? 'noopener noreferrer' : null"
    :aria-label="newWindowAriaLabel"
  >
    <slot />
  </router-link>
  <a v-else
     :href="url"
     :target="shouldOpenInNewWindow ? '_blank' : '_self'"
     :rel="shouldOpenInNewWindow ? 'noopener noreferrer' : null"
     :aria-label="newWindowAriaLabel"
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
  inheritAttrs: false,
  props: {
    link: {
      type: Object,
      required: true
    },
    isNewWindow: {
      type: Boolean
    },
    ariaLabel: {
      type: String,
      default: undefined
    }
  },
  computed: {
    ...mapGetters({
      storeCodeFromHeader: 'storyblok/storeCode'
    }),
    isExternal () {
      return isUrlExternal(this.url);
    },
    shouldOpenInNewWindow () {
      if (this.isNewWindow !== undefined) {
        return this.isNewWindow;
      }

      return this.isExternal;
    },
    url () {
      return getUrlFromLink(this.link, this.$ssrContext, this.storeCodeFromHeader);
    },
    newWindowAriaLabel () {
      if (!this.shouldOpenInNewWindow || !this.ariaLabel) {
        return this.ariaLabel;
      }

      return this.ariaLabel + ' ' + this.$t('opens in new tab');
    }
  }
}
</script>
