<template>
  <div id="product-tile">
    Core Product Tile
  </div>
</template>

<script>
import AddToCart from './AddToCart.vue'

export default {
  name: 'product-tile',
  props: ['product'],
  components: {
    AddToCart
  }
}
</script>