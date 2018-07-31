/**
 * Functionality for loading wishlist data from cache.
 *
 * #### Hooks
 * ##### Created
 * Loades wishlist data from cache. Dispatches `wishlist/load` Vuex action
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const loadWishlist = {
  created () {
    this.$store.dispatch('wishlist/load')
  }
}
