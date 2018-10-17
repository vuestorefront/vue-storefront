/**
 * Functionality for adding discount code.
 *
 * #### Methods
 * - **`applyCoupon(code)`** applies coupon with given code. Dispatches `cart/applyCoupon` Vuex action
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const applyCoupon = {
  methods: {
    applyCoupon (code: String) : Promise<boolean> {
      return this.$store.dispatch('cart/applyCoupon', code)
    }
  }
}
