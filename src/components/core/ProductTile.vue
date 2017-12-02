<template>
  <div class="product-tile">
    Core Product Tile
    <!-- 
        Product name and price with price filter 
        props;
        "product" - product object width 'name', 'priceInclTax', 'image' properties
        data to display:
        {{ product.name }}
        {{ product.priceInclTax | price }}
        {{ product.image }}
    -->
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
