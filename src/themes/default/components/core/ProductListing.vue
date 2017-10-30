<template>
  <div class="product-listing row center-xs">
    <div v-for="product in products" :key="product.id" class="p15" :class="'col-md-' + (12/columns)%10">
      <product-tile :product="product" />
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
