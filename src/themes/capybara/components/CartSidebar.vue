<template>
  <SfSidebar
    :visible="isOpen"
    @close="onClose"
    class="sf-sidebar--right"
    >
    Cart:
    {{ productsInCart }}
    {{ totals }}
  </SfSidebar>
</template>

<script>
import { SfSidebar } from '@storefrontui/vue'

export default {
  name: 'CartSidebar',
  computed: {
    productsInCart (){
      return this.$store.state.cart.cartItems
    },
    appliedCoupon (){
      return this.$store.getters['cart/getCoupon']
    },
    totals () {
      return this.$store.getters['cart/getTotals']
    },
    isOpen (){
      return this.$store.getters['ui/isCartSidebarOpen']
    }
  },
  methods: {
    applyCoupon (code) {
      return this.$store.dispatch('cart/applyCoupon', code)
    },
    removeCoupon () {
      return this.$store.dispatch('cart/removeCoupon')
    },
    onClose () {
      this.$store.dispatch('ui/toggleCartSidebar')
    }
  },
  components: {
    SfSidebar
  }
}
</script>