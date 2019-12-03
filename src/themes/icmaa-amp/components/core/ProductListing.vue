<template>
  <div class="product-listing t-flex t-flex-wrap t-justify-start t-px-3 lg:t-px-4 lg:t--mx-2">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="product t-cursor-pointer t-px-1 lg:t-px-2 t-mb-8 t-w-1/2 lg:t-w-1/4"
    >
      <product-tile :product="product" />
    </div>
  </div>
</template>

<script>
import ProductListing from 'theme/components/core/ProductListing'
import ProductTile from './ProductTile'
let lastHero = 0
export default {
  components: {
    ProductTile
  },
  mixins: [ProductListing],
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    }
  }
}
</script>
