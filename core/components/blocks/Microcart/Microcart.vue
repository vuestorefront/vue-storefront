<template>
  <div class="microcart" :class="{ active: isOpen }">
    Core Microcart
    <!-- Items in cart displayed as a list with quantitys for each item -->
    <ul>
      <li v-for="(product, index) in items" :key="index">
        {{ product.name | htmlDecode }}
        {{ product.priceInclTax }}
        {{ product.qty }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Microcart',
  props: {
    product: {
      type: Object,
      required: false,
      default: () => {}
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
    this.$store.dispatch('cart/load') // load cart from the indexedDb
    this.$bus.$on('network-before-checkStatus', (status) => {
      this.isOnline = status.online
    })
  },
  destroyed () {
    this.$bus.$off('network-before-checkStatus')
  },
  methods: {
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
</script>
