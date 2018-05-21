import { mapActions, mapState, mapGetters } from 'vuex'

export default {
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
      couponCode: '',
      isOnline: true
    }
  },
  created () {
    this.$bus.$on('network-before-checkStatus', this.onNetworkStatusChanged)
  },
  destroyed () {
    this.$bus.$off('network-before-checkStatus', this.onNetworkStatusChanged)
  },
  methods: {
    onNetworkStatusChanged (status) {
      this.isOnline = status.online
    },
    closeMicrocart () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
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
    },
    ...mapActions({ 'removeFromCart': 'cart/removeItem' })
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
    items () {
      return this.$store.state.cart.cartItems
    },
    coupon () {
      return this.$store.state.cart.platformTotals && this.$store.state.cart.platformTotals.hasOwnProperty('coupon_code') ? this.$store.state.cart.platformTotals.coupon_code : ''
    },
    ...mapState({
      isOpen: state => state.ui.microcart
    })
  }
}
