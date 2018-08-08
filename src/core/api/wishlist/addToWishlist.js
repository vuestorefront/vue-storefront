/**
 * Functionality for adding product to the wishlist.
 *
 * #### Methods
 * - **`addToWishlist(product)`** adds passed product to the wishlist. Dispatches `wishlist/addItem` Vuex action
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const addToWishlist = {
  methods: {
    addToWishlist (product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/addItem', product) : false
    }
  }
}
