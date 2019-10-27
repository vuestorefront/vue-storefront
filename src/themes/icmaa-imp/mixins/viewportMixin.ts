import { isServer } from '@vue-storefront/core/helpers'
import debounce from 'lodash-es/debounce'

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
    handleResize: debounce(function () {
      this.$store.dispatch('ui/setViewport', window)
    }, 250)
  }
}
