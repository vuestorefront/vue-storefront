export default {
  computed: {
    // previosly 'items'
    productsInCart () {
      return this.$store.state.cart.cartItems
    }
  }
}
