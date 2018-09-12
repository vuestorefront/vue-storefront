/**
 * Functionality for removing discount code.
 *
 * #### Methods
 * - **`removeCoupon`** remove applied coupon. Dispatches `cart/removeCoupon` Vuex action
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const removeCoupon = {
  methods: {
    removeCoupon () : Promise<boolean> {
      return this.$store.dispatch('cart/removeCoupon')
    }
  }
}
