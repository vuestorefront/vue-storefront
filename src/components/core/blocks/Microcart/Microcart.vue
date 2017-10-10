<template>
  <div class="microcart">
    Core Microcart
    <!-- Items in cart displayed as a list with quantitys for each item -->
    <ul>
      <li v-for='product in items'>
        {{ product.name }}
        {{ product.price }}
        {{ product.quantity }}
      </li>
    </ul>  
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'microcart',
  props: ['product'],
  created () {
    this.$store.dispatch('cart/load') // load cart from the indexedDb
  },
  methods: {
    ...mapActions({ 'removeFromCart': 'cart/removeItem' })
  },
  computed: {
    shipping () {
      return this.$store.state.cart.shipping
    },
    payment () {
      return this.$store.state.cart.payment
    },
    total () {
      return this.$store.getters['cart/totals']
    },
    items () {
      return this.$store.state.cart.cartItems
    }
  }
}
</script>

