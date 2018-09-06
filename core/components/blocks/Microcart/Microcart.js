import VueOfflineMixin from 'vue-offline/mixin'

// Core dependecies
import { productsInCart, closeMicrocart, isMicrocartOpen, removeFromCart, applyCoupon, removeCoupon, appliedCoupon, totals } from '@vue-storefront/core/modules/cart/features'

import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

export default {
  name: 'Microcart',
  mixins: [
    onEscapePress,
    productsInCart,
    isMicrocartOpen,
    closeMicrocart,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    totals,
    VueOfflineMixin
  ],
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    shipping () {
      return this.$store.state.cart.shipping
    },
    payment () {
      return this.$store.state.cart.payment
    }
  }
}
