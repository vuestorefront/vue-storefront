/**
 * Functionality for returning total segments array.
 *
 * #### Computed properties
 * - **`cartTotals`** returns cart totals segments (like total, subtotal, shipping, tax, discount) as CartTotalSegments array of CartTotalSegmentsItem. Returns `cart/totals` Vuex getter.
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import CartTotalSegments from '@vue-storefront/store/types/cart/CartTotalSegments'
export const cartTotals = {
  computed: {
    cartTotals () : CartTotalSegments {
      return this.$store.getters['cart/totals']
    }
  }
}
