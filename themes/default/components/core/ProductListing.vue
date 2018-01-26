<template>
  <div class="product-listing row m0 start-xs">
    <div v-for="(product, key) in products" :key="product.id" class="col-xs-6 pb10" :class="'col-md-' + (12/columns)%10">
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
