<template>
  <div class="cart-summary">
    <h3 class="c-black ml30">Order Summary</h3>
    <ul class="products">
      <product v-for="product in items" :key="product.id" :product="product" />
    </ul>
    <div v-if="items.length" class="checkout bg-lightgray pt10 serif c-black">
      <div class="row pt15 pb20 pl30 pr55 ">
        <div class="col-xs">
          Delivery
        </div>
        <div class="col-xs align-right">
          {{ 10 | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55">
        <div class="col-xs">
          Taxes
        </div>
        <div class="col-xs align-right">
          {{ 10 | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55 weight-400 h3">
        <div class="col-xs">
          Order summary
        </div>
        <div class="col-xs align-right">
          {{ total | price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
import Product from '../Microcart/Product'

export default {
  created () {
    EventBus.$emit('checkout.cartSummary', this.items)
  },
  components: {
    Product
  },
  mixins: [coreComponent('core/blocks/Checkout/CartSummary')]
}
</script>

<style lang="scss" scoped>

</style>
