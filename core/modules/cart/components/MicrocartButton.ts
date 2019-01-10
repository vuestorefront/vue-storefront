
export const MicrocartButton = {
  name: 'MicrocartButton',
  methods: {
    toggleMicrocart () {
      this.$store.dispatch('cart/toggleMicrocart')
    }
  },
  computed: {
    quantity () {
      return this.$store.getters['cart/totalQuantity']
    }
  }
}
