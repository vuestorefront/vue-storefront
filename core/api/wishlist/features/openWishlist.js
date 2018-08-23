/**
 * [Helper] Optional UI functionality for opening wishlist.
 *
 * #### Methods
 * - **`openWishlist`** sets `wishlist` and `overlay` property from features state to `true`. Dispatches `ui/setWishlist'` Vuex action
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const openWishlist = {
  methods: {
    openWishlist () {
      this.$store.commit('ui/setWishlist', true)
    }
  }
}
