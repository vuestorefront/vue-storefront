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
import { productThumbnailPath } from 'core/helpers'
export default {
  name: 'ProductTile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, image is going to be 'red'
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, 310, 300)
    }
  }
}
</script>
