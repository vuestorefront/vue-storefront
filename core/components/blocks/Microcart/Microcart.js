// 3rd party dependecies
import { mapGetters } from 'vuex'
import VueOfflineMixin from 'vue-offline/mixin'

// Core dependecies
import { productsInCart, closeMicrocart, isMicrocartOpen, removeFromCart } from 'core/api/cart'

// Core mixins
import onEscapePress from 'core/mixins/onEscapePress'

export default {
  name: 'Microcart',
  mixins: [onEscapePress, productsInCart, isMicrocartOpen, closeMicrocart, removeFromCart, VueOfflineMixin],
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
  data () {
    return {
      addCouponPressed: false,
      couponCode: ''
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
    },
    coupon () {
      return this.$store.state.cart.platformTotals && this.$store.state.cart.platformTotals.hasOwnProperty('coupon_code') ? this.$store.state.cart.platformTotals.coupon_code : ''
    }
  },
  methods: {
    onEscapePress () {
      this.closeMicrocart()
    },
    closeMicrocartExtend () {
      this.closeMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    removeCoupon () {
      this.$store.dispatch('cart/removeCoupon')
      this.addCouponPressed = false
    },
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    applyCoupon () {
      this.$store.dispatch('cart/applyCoupon', this.couponCode)
      this.addCouponPressed = false
      this.couponCode = ''
    },
    enterCoupon (e) {
      if (e.keyCode === 13) {
        this.applyCoupon()
      }
    }
  }
}
