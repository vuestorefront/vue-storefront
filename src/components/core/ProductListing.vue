<template>
  <!-- 
  Aggregator for multiple ProductTile components to be displayed in columns or other type of grid 
  props:
  "products" - array of products
  "columns" - object of columns to be displayed
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
  data () {
    return {
      defaultColumns: {
        xs: 6,
        sm: 6,
        md: 4,
        lg: 4
      }
    }
  },
  components: {
    ProductTile
  },
  computed: {
    computeColumns () {
      let cols = {}
      Object.assign(cols, this.columns, this.defaultColumns)
      return `col-xs-${cols.xs} 
              col-sm-${cols.sm} 
              col-md-${cols.md} 
              col-lg-${cols.lg}`
    }
  }
}
</script>

