/**
 * Functionality for returning payment method
 *
 * #### Computed properties
 * - **`cartPayment`** returns default cart payment method. Returns `cart/payment` Vuex state.
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const cartPayment = {
  computed: {
    cartPayment () : Object {
      return this.$store.state.cart.payment
    }
  }
}
