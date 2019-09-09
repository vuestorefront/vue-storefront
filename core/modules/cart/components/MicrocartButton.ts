
// @deprecated moved to theme
export const MicrocartButton = {
  name: 'MicrocartButton',
  mounted () {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.$store.dispatch('cart/load')
      }
    })
  },
  methods: {
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
