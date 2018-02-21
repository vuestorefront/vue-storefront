<template>
  <div class="product-listing row m0 center-xs start-md">
    <div
      v-for="(product, key) in products"
      :key="product.id"
      class="pb10 col-sm-6"
      :class="['col-md-' + (12/columns)%10, wide(product.sale)]"
    >
      <product-tile :product="product" :instant="key < 6 ? true : false" />
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import ProductTile from './ProductTile.vue'

export default {
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    ProductTile
  },
  mixins: [coreComponent('ProductListing')],
  methods: {
    wide (isOnSale) {
      return isOnSale === '1' ? 'col-xs-12' : 'col-xs-6'
    }
  }
}
</script>
