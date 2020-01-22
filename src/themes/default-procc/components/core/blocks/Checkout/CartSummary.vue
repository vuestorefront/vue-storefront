<template>
  <div class="w-100">
<!--    // Edited by Dan 02-01-2020-->
    <div class="brdr-cl-primary py5 px20" style="">
      <h3 class="order-sum cl-accent summary-title">
        {{ $t('Cart Items') }}
      </h3>
      <div class="store-info">
        <img src="http://localhost:3000/assets/logo.svg" alt="" class="brand-img">
        <p>RBRIGHT GLASSES Store</p>
        <div class="store-contact text brand-contact">
          <button class="btn normal-icon-btn">
            <i class="material-icons" data-v-0ac1abd3="">mail_outline</i>
          </button>
        </div>
        <div class="store-contact text shipping-method">
          DHL
          <button class="btn normal-icon-btn"> <i class="material-icons" data-v-0ac1abd3="" @click="showShippingModel">local_shipping</i>
          </button>
        </div>
      </div>
      <product v-for="product in productsInCart" :key="product.sku" :product="product" />
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
    <shipping-method  v-if="loadShippingMethod" :store-brand-id="products[0].procc_brand_id" />
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'
import ShippingMethod from './ShippingMethod'

export default {
  components: {
    Product,
    ShippingMethod
  },
  props: {
    products: {
      type: Array
    }
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
  .store-info .brand-img {
    max-width: 30px;
    float: left;
    margin-right: 10px;
  }
  .store-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .store-contact.text.shipping-method {
    margin-left: auto;
    display: flex;
    align-items: center;
    max-width: 80%;
    line-height: normal;
  }
  .store-contact.text.shipping-method i {
    margin-left: 10px;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    .store-info p {
      min-width: calc(100% - 79px);
    }
  }
</style>
