export const addToCart = {
  methods: {
    addToCart (product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}
