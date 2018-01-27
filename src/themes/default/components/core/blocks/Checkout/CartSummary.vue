<template>
<div>
  <div class="brdr-bottom brdr-c-lightgray-secondary pb60">
    <h3 class="c-black ml30 mt50 summary-title">Order Summary</h3>
    <product v-for="product in items" :key="product.id" :product="product" />
    <div v-if="items.length" class="checkout bg-lightgray pt10 serif c-black">
      <div class="row pt15 pb20 pl30 pr55 ">
        <div class="col-xs c-black">
          Shipping ({{ shipping.name }})
        </div>
        <div class="col-xs align-right c-black h4">
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
  <div class="py50 px25">
    <h4 class="h3 m0">
      Safety
    </h4>
    <p class="c-lightgray-secondary lh20">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
    </p>
    <h4 class="h3 mb0">
      Shipping
    </h4>
    <p class="c-lightgray-secondary lh20">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
    </p>
    <h4 class="h3 mb0">
      Returns
    </h4>
    <p class="c-lightgray-secondary lh20">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
    </p>
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

<style lang="scss" scoped>
  .summary-title {
    margin-top: 20px !important;

    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
</style>
