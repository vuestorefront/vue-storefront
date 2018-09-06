// Core dependecies
import {
  productsInCart,
  closeMicrocart,
  isMicrocartOpen,
  removeFromCart,
  applyCoupon,
  removeCoupon,
  appliedCoupon,
  totals,
  shipping,
  payment
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
    totals,
    shipping,
    payment
  ],
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
}
