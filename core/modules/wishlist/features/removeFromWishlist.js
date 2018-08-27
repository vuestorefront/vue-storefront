/**
 * Functionality for removing product from the wishlist.
 *
 * #### Methods
 * - **`removeFromWishlist(product)`** removes passed product from the wishlist. Dispatches `wishlist/removeItem` Vuex action.
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const removeFromWishlist = {
  methods: {
    removeFromWishlist (product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/removeItem', product) : false
    }
  }
}
