<template>
  <div v-if="productsInCart && productsInCart.length" class="checkout pt10 serif cl-accent">
    <h3 class="order-sum pl20 pr20">Order Summary</h3>
    <div v-for="(segment, index) in totals" :key="index" class="row pl20 pr20 py5" v-if="segment.code !== 'grand_total'">
      <div class="col-xs cl-accent">
        {{ segment.title }}
      </div>
      <div v-if="segment.value != null" class="col-xs align-right cl-accent h4">
        {{ segment.value | price }}
      </div>
    </div>

    <div class="row pl20 pr20 py5 h3" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
      <div class="col-xs"><h3 class="order-sum">
        {{ segment.title }}
      </h3>
      </div>
      <div class="col-xs align-right"><h3 class="order-sum">
        {{ segment.value | price }}
      </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  .summary-title {
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
</style>
