<template>
  <div class="product-listing row m0 center-xs start-md">
    <div
      v-for="(product, key) in products"
      :key="product.id"
      class="p15 col-sm-6 relative"
      :class="['col-md-' + (12/columns)%10, wide(product.sale, key)]"
    >
      <product-tile :product="product" :instant="key < 6 ? true : false" />
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
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
    wide (isOnSale, index) {
      // last image always shouldn't be big, we also need to count from last promoted to check if it will look ok
      return isOnSale === '1' || index === this.products.length - 1 ? 'col-xs-12' : 'col-xs-6'
    }
  }
}
</script>
