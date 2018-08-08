/**
 * Functionality for removing all products from the wishlist.
 *
 * #### Methods
 * - **`clearWishlist()`** removes all products from the wishlist. Dispatches `wishlist/clear` Vuex action
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const clearWishlist = {
  methods: {
    clearWishlist () {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/clear') : false
    }
  }
}
