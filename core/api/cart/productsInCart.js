export const productsInCart = {
  computed: {
    productsInCart () {
      return this.$store.state.cart.cartItems
    }
  }
}
