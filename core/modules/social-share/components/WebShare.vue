<template>
  <no-ssr>
    <span v-if="isSupported" @click="share">
      <slot>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
      </slot>
    </span>
  </no-ssr>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { isServer } from '@vue-storefront/core/helpers'

export default {
  name: 'WebShare',
  components: {
    'no-ssr': NoSSR
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default () {
        return typeof window !== 'undefined' ? window.location.href : ''
      }
    }
  },
  computed: {
    isSupported () {
      return !isServer && navigator.share
    }
  },
  methods: {
    share () {
      if (navigator.share) {
        navigator.share({
          title: this.title,
          text: this.text,
          url: this.url || window.location.href
        })
      }
    }
  }
}
</script>
