/**
 * Functionality for returning shipping method
 *
 * #### Computed properties
 * - **`cartShipping`** returns cart shipping. Returns `cart/shipping` Vuex state.
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const cartShipping = {
  computed: {
    cartShipping () : Object {
      return this.$store.state.cart.shipping
    }
  }
}
