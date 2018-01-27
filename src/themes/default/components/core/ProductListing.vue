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
