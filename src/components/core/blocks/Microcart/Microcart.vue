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
import { mapActions, mapState } from 'vuex'

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
  created () {
    this.$store.dispatch('cart/load') // load cart from the indexedDb
  },
  methods: {
    closeMicrocart () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
    },
    ...mapActions({ 'removeFromCart': 'cart/removeItem' })
  },
  computed: {
    shipping () {
      return this.$store.state.cart.shipping
    },
    payment () {
      return this.$store.state.cart.payment
    },
    subtotal () {
      return this.$store.getters['cart/totals'].subtotal
    },
    subtotalInclTax () {
      return this.$store.getters['cart/totals'].subtotalInclTax
    },
    total () {
      return this.subtotal + this.shipping.cost + this.payment.cost
    },
    totalInclTax () {
      return this.subtotalInclTax + this.shipping.costInclTax + this.payment.costInclTax
    },
    items () {
      return this.$store.state.cart.cartItems
    },
    ...mapState({
      isOpen: state => state.ui.microcart
    })
  }
}
</script>

