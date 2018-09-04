/**
 * Functionality for returning provided coupon code and discount value
 *
 * #### Computed properties
 * - **`appliedCoupon`** returns coupon code and provided discount.
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import AppliedCoupon from '@vue-storefront/store/types/cart/AppliedCoupon'
export const appliedCoupon = {
  computed: {
    appliedCoupon () : AppliedCoupon | false {
      if (!(this.$store.state.cart.platformTotals && this.$store.state.cart.platformTotals.hasOwnProperty('coupon_code'))) {
        return false
      }
      return {
        code: this.$store.state.cart.platformTotals.coupon_code,
        discount: this.$store.state.cart.platformTotals.discount_amount
      }
    }
  }
}
