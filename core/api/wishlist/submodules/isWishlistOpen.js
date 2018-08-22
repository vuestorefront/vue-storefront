/**
 * [Helper] Optional UI functionality for informing if wishlist is open.
 *
 * #### Computed properties
 * - **`isWishlistOpen`** returns `true` if Microcart is open. Retuens `submodules/wishlist` Vuex state.
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const isWishlistOpen = {
  computed: {
    isWishlistOpen () {
      return this.$store.state.ui.wishlist
    }
  }
}
