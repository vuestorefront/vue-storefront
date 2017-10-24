<template>
  <!-- 
  Aggregator for multiple ProductTile components to be displayed in columns or other type of grid 
    @props:
      products: Array of products
      columns: Number of columns products should be displayed in a desktop view. 
               In mobile view it's always one column.
    -->
  <div class="product-listi">
    <div v-for="product in products" :key="product.id"></div>
  </div>
</template>

<script>
import ProductTile from './ProductTile.vue'

export default {
  name: 'product-listing',
  props: ['products', 'columns'],
  components: {
    ProductTile
  }
}
</script>

