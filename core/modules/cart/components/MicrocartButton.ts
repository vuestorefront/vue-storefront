
// @deprecated moved to theme
export const MicrocartButton = {
  name: 'MicrocartButton',
  mounted () {
    document.addEventListener('visibilitychange', this.loadCartIfTabVisible)
  },
  beforeDestroy () {
    document.removeEventListener('visibilitychange', this.loadCartIfTabVisible)
  },
  methods: {
    loadCartIfTabVisible () {
      if (!document.hidden) {
        this.$store.dispatch('cart/load');
      }
    },
    toggleMicrocart () {
      this.$store.dispatch('cart/toggleMicrocart')
    }
  },
  computed: {
    quantity () {
      return this.$store.getters['cart/getItemsTotalQuantity']
    }
  }
}
