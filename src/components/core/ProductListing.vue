<template>
  
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

