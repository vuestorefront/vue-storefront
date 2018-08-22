/**
 * [Helper] Optional UI functionality for closing wishlist.
 *
 * #### Methods
 * - **`closeWishlist`** sets `wishlist` and `overlay` property from features state to `false`. Dispatches `features/setWishlist'` Vuex action
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const closeWishlist = {
  methods: {
    closeWishlist () {
      this.$store.commit('features/setWishlist', false)
    }
  }
}
