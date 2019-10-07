import { isServer } from '@vue-storefront/core/helpers'

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
    handleResize () {
      this.$store.dispatch('ui/setViewport', window)
    }
  }
}
