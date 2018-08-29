/**
 * Functionality for removing product from the wishlist.
 *
 * #### Methods
 * - **`removeFromWishlist(product)`** removes passed product from the wishlist. Dispatches `wishlist/removeItem` Vuex action.
 *
 * Part of [Wishlist API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import Product from '@vue-storefront/store/types/product/Product'
export const removeFromWishlist = {
  methods: {
    removeFromWishlist (product: Product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/removeItem', product) : false
    }
  }
}
