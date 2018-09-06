/**
 * Functionality for returning payment method
 *
 * #### Computed properties
 * - **`shipping`** returns cart payment. Returns `cart/payment` Vuex state.
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const payment = {
  computed: {
    payment () : Object {
      return this.$store.state.cart.payment
    }
  }
}
