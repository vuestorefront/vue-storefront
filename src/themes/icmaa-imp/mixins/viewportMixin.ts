import { isServer } from '@vue-storefront/core/helpers'
import throttle from 'lodash-es/throttle'

export default {
  created () {
    if (!isServer) {
      window.addEventListener('resize', this.handleResize)
      this.$nextTick(this.handleResize)
    }
  },
  destroyed () {
    if (!isServer) {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  methods: {
    handleResize: throttle(function () {
      this.$store.dispatch('ui/setViewport', window)

      /**
       * Fix viewport vh bug in mobile browsers
       * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
       */
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }, 100)
  }
}
