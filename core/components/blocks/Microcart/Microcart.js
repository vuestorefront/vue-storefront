import { mapGetters } from 'vuex'
import VueOfflineMixin from 'vue-offline/mixin'

// Core dependecies
import { productsInCart, closeMicrocart, isMicrocartOpen, removeFromCart, applyCoupon, removeCoupon, appliedCoupon } from '@vue-storefront/core/modules/cart/features'

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
    VueOfflineMixin
  ],
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    },
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    }),
    shipping () {
      return this.$store.state.cart.shipping
    },
    payment () {
      return this.$store.state.cart.payment
    }
  },
  methods: {
    onEscapePress () {
      this.closeMicrocart()
    }
  }
}
