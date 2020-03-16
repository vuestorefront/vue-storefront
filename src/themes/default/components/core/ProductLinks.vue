<template>
  <div class="links py10">
    <div class="between-md" v-for="(productLink, index) in products" :key="index">
      <div class="py10" v-if="productLink.product">
        <div class="row middle-xs h4 mb10">
          <p class="col-xs-7 serif m0">
            {{ productLink.product.name | htmlDecode }}
          </p>
          <div class="col-xs-4 cl-bg-tertiary">
            <div v-if="productLink.product.special_price && productLink.product.price_incl_tax && productLink.product.original_price_incl_tax">
              <span class="price-special">{{ productLink.product.price_incl_tax | price(storeView) }}</span>&nbsp;
              <span class="price-original">{{ productLink.product.original_price_incl_tax | price(storeView) }}</span>
            </div>
            <div v-if="!productLink.product.special_price && productLink.product.price_incl_tax">
              {{ productLink.product.price_incl_tax | price(storeView) }}
            </div>
          </div>
        </div>

        <div v-if="productLink.product" class="py5">
          <p class="h6 cl-bg-tertiary m0">
            {{ $t('Quantity') }}
          </p>
          <input
            type="number"
            class="product-qty py10 brdr-cl-primary bg-cl-transparent h4"
            min="1"
            autofocus
            v-model.number="productLink.product.qty"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  computed: {
    storeView () {
      return currentStoreView()
    }
  }
}
</script>

<style scoped>
.product-qty {
  border-style: solid;
  border-width: 0 0 1px 0;
  width: 90px;
}
</style>
