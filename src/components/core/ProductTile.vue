<template>
  <div class="product-tile">
    Core Product Tile
    <!-- Product name and price -->
    {{ product.name}} - {{ product.price }} 
    <!-- Add to cart button. Pass whole product as prop -->
  </div>
</template>

<script>
import AddToCart from './AddToCart.vue'
import { thumb } from '../../lib/filters'

export default {
  name: 'product-tile',
  props: ['product'],
  components: { AddToCart },
  computed: {
    thumbnail () {
      return thumb(this.product.image, 140, 300)
    }
  }
}
</script>