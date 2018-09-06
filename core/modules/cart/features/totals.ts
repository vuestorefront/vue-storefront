/**
 * Functionality for returning total segments array.
 *
 * #### Computed properties
 * - **`totals`** returns cart totals array. Returns `cart/totals` Vuex getter.
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import CartTotalSegments from '@vue-storefront/store/types/cart/CartTotalSegments'
export const totals = {
  computed: {
    totals () : CartTotalSegments {
      return this.$store.getters['cart/totals']
    }
  }
}
