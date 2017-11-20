<template>
  <div class="cart-summary">
    <h3 class="c-black ml30">Order Summary</h3>
    <ul class="products">
      <product v-for="product in items" :key="product.id" :product="product" />
    </ul>
    <div v-if="items.length" class="checkout bg-lightgray pt10 serif c-black">
      <div class="row pt15 pb20 pl30 pr55 ">
        <div class="col-xs c-black">
          Shipping ({{ shipping.name }})
        </div>
        <div class="col-xs align-right c-black">
          {{ shipping.costInclTax | price }}
        </div>
      </div>
      <div class="row pt15 pb20 pl30 pr55 ">
        <div class="col-xs c-black">
          Payment ({{ payment.name }})
        </div>
        <div class="col-xs align-right c-black" v-if='payment.costInclTax > 0'>
          {{ payment.costInclTax | price }}
        </div>
      </div>
<!--             <div class="row pt20 pb20 pl30 pr55">
    <div class="col-xs">
          Taxes
        </div>
        <div class="col-xs align-right">
          {{ 10 | price }}
        </div>
      </div> -->
      <div class="row pt20 pb20 pl30 pr55 weight-400 h3">
        <div class="col-xs">
          Order summary
        </div>
        <div class="col-xs align-right">
          {{ totalInclTax | price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [coreComponent('core/blocks/Checkout/CartSummary')]
}
</script>
