<template>
  <div class="cart-summary">
    Core CartSumary
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
import Microcart from '../Microcart/Microcart'
import { mapGetters } from 'vuex'

export default {
  name: 'CartSummary',
  mixins: [Microcart],
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    })
  }
}
</script>
