<template>
  <div class="w-100">
<!--    // Edited by Dan 02-01-2020-->
    <div class="brdr-cl-primary py5 px20" style="">
      <h3 class="order-sum cl-accent summary-title">
        {{ $t('Order Summary') }}
      </h3>
      <div class="store-info">
        <p>Seller: RBRIGHT GLASSES Store</p>
        <div class="store-contact"><i class="material-icons" data-v-0ac1abd3="">mail_outline</i> Contact</div>
      </div>
      <product v-for="product in productsInCart" :key="product.sku" :product="product" />
      <div class="shipping-text mb15" style="text-align: right;">Shipping: up</div>
    </div>
    <div class="py50 px25" v-show="false && 'TODO: need to edit the texts'">
      <h4 class="h3 m0">
        {{ $t('Safety') }}
      </h4>
      <p class="cl-tertiary lh20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
      <h4 class="h3 mb0" v-if="!isVirtualCart">
        {{ $t('Shipping') }}
      </h4>
      <p class="cl-tertiary lh20" v-if="!isVirtualCart">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
      <h4 class="h3 mb0">
        {{ $t('Returns') }}
      </h4>
      <p class="cl-tertiary lh20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </p>
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
