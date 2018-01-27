<template>
  <!-- 
  Aggregator for multiple ProductTile components to be displayed in columns or other type of grid 
  props:
  "products" - array of products
  "columns" - # of columns to be displayed
  data to display
  v-for="product in products"
    -->
  <div class="product-listi">
    <div v-for="product in products" :key="product.id"></div>
  </div>
</template>

<script>
import ProductTile from './ProductTile.vue'

export default {
  name: 'product-listing',
  props: {
    products: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Object,
      default () {
        return {
          xs: 6,
          sm: 6,
          md: 3,
          lg: 4
        }
      }
    }
  },
  components: {
    ProductTile
  }
}
</script>

