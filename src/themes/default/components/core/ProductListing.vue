<template>
  <div class="product-listing row start-xs">
    <div v-for="(product, key) in products" :key="product.id" :class="'col-md-' + (12/columns)%10">
      <product-tile :product="product" :instant='key < 6 ? true : false' />
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import ProductTile from './ProductTile.vue'

export default {
  props: ['products', 'columns'],
  components: {
    ProductTile
  },
  mixins: [coreComponent('core/ProductListing')]
}
</script>
