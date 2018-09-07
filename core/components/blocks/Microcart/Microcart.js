// Core dependecies
import {
  productsInCart,
  closeMicrocart,
  isMicrocartOpen,
  removeFromCart,
  applyCoupon,
  removeCoupon,
  appliedCoupon,
  cartTotals,
  cartShipping,
  cartPayment
} from '@vue-storefront/core/modules/cart/features'

export default {
  name: 'Microcart',
  mixins: [
    productsInCart,
    isMicrocartOpen,
    closeMicrocart,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    cartTotals,
    cartShipping,
    cartPayment
  ],
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
}
