/**
 * Functionality for returning products in wishlist.
 *
 * #### Computed properties
 * - **`productsInWishlist`** returns products in wishlist. Returns `wishlist/items` Vuex state.
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const productsInWishlist = {
  computed: {
    productsInWishlist () {
      return this.$store.state.wishlist.items
    }
  }
}
