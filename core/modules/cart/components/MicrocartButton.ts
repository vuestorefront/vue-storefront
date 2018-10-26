
export const MicrocartButton = {
  name: 'MicrocartButton',
  methods: {
    toggleMicrocart () : void {
      this.$store.dispatch('cart/toggleMicrocart')
    }
  },
  computed: {
    quantity () {
      return this.$store.getters['cart/totalQuantity']
    }
  }
}
