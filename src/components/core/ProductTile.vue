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
      // get first configurable child image
      // NOTE: might not work when product has no children
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, image is going to be 'red'
      return thumbnail(this.product.configurable_children && this.product.configurable_children.length > 0 ? this.product.configurable_children[0].image : this.product.image, 310, 300)
    }
  }
}
</script>
