export const removeFromCart = {
  methods: {
    removeFromCart (product) {
      this.$store.dispatch('cart/removeItem', product)
    }
  }
}
