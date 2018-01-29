<template>
  <div class="product-listing row m0 start-xs">
    <div v-for="(product, key) in products" :key="product.id" class="pb10" :class="computeColumns">
      <product-tile :product="product" :instant='key < 6 ? true : false' />
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import ProductTile from './ProductTile.vue'

export default {
  name: 'ProductListing',
  mixins: [coreComponent('core/ProductListing')],
  components: {
    ProductTile
  }
}
</script>
