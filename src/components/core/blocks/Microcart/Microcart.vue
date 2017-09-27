<template>
  <div class="microcart">
    Core Microcart
    <!-- Items in cart displayed as a list with quantitys for each item -->
    <ul>
      <li v-for='product in items'>
        {{ product.name }} - {{ product.price }}  - x{{ product.quantity }}
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
    this.$store.dispatch('cart/loadCart') // load cart from the indexedDb
  },
  methods: {
    ...mapActions({ 'removeFromCart': 'cart/removeFromCart' })
  },
  computed: {
    items () {
      return this.$store.state.cart.cartItems
    }
  }
}
</script>

