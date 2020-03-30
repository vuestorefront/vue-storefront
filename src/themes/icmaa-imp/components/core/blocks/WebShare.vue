<template>
  <div>
    <a v-for="(shareUrl, key) in shareUrls" :key="key" :href="shareUrl" target="_blank" rel="noopener noreferrer" title="key | capitalize" class="t-text-base-light" :class="{ 't-mr-4': key !== lastKey }">
      <material-icon icon-set="icmaa" :icon="key" size="sm" />
    </a>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { isServer } from '@vue-storefront/core/helpers'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'WebShare',
  props: {
    webshareText: {
      type: String,
      required: true
    },
    webshareImage: {
      type: String,
      default: ''
    }
  },
  components: {
    MaterialIcon
  },
  computed: {
    url () {
      return encodeURIComponent(isServer ? this.$route.query.page : window.location.href)
    },
    text () {
      return encodeURIComponent(this.webshareText)
    },
    image () {
      return encodeURIComponent(this.webshareImage)
    },
    shareUrls () {
      return {
        'facebook-square': `https://facebook.com/sharer/sharer.php?u=${this.url}`,
        'twitter': `https://twitter.com/intent/tweet/?text=${this.text}&amp;url=${this.url}`,
        'pinterest': `https://pinterest.com/pin/create/button/?url=${this.url}&amp;media=${this.image}&amp;description=${this.text}`,
        'whatsapp': `whatsapp://send?text=${this.url}%20${this.text}`
      }
    },
    lastKey () {
      return Object.keys(this.shareUrls)[Object.keys(this.shareUrls).length - 1]
    }
  }
}
</script>
