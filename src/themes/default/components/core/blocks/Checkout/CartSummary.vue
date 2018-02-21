<template>
  <div>
    <div class="brdr-bottom brdr-c-lightgray-secondary pb60">
      <h3 class="c-darkgray ml30 mt50 summary-title">
        {{ $t('Order Summary') }}
      </h3>
      <product v-for="product in items" :key="product.id" :product="product"/>
      <div v-if="items.length" class="checkout bg-lightgray pt10 serif c-darkgray">

        <div v-for="(segment, index) in totals" :key="index" class="row pt15 pb20 pl30 pr55 " v-if="segment.code !== 'grand_total'">
          <div class="col-xs c-darkgray">
            {{ segment.title }}
          </div>
          <div class="col-xs align-right c-darkgray h4">
            {{ segment.value | price }}
          </div>
        </div>

        <div class="row pt20 pb20 pl30 pr55 weight-400 h3" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="col-xs">
            {{ segment.title }}
          </div>
          <div class="col-xs align-right">
            {{ segment.value | price }}
          </div>
        </div>
      </div>
    </div>
    <div class="py50 px25">
      <h4 class="h3 m0">
        {{ $t('Safety') }}
      </h4>
      <p class="c-lightgray-secondary lh20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
      <h4 class="h3 mb0">
        {{ $t('Shipping') }}
      </h4>
      <p class="c-lightgray-secondary lh20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
      <h4 class="h3 mb0">
        {{ $t('Returns') }}
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
  mixins: [coreComponent('blocks/Checkout/CartSummary')]
}
</script>

<style lang="scss" scoped>
  .summary-title {
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
</style>
