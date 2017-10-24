<template>
  <div class="product-tile">
    Core Product Tile
    <!-- Product name and price with price filter -->
    {{ product.name}} - {{ product.price | price }} 
  </div>
</template>

<script>
import { thumbnail } from 'src/lib/filters'

export default {
  name: 'product-tile',
  props: ['product'],
  computed: {
    thumbnail () {
      return thumbnail(this.product.image, 310, 300)
    }
  }
}
</script>