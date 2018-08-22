/**
 * [Helper] Optional UI functionality for opening wishlist.
 *
 * #### Methods
 * - **`openWishlist`** sets `wishlist` and `overlay` property from submodules state to `true`. Dispatches `submodules/setWishlist'` Vuex action
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const openWishlist = {
  methods: {
    openWishlist () {
      this.$store.commit('submodules/setWishlist', true)
    }
  }
}
