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
      let thumbnail = this.product.image
      if (this.product.hasOwnProperty('configurable_children') &&
        this.product.configurable_children.length && !this.product.is_configured
      ) {
        thumbnail = this.product.configurable_children[0].thumbnail
      }
      return this.getThumbnail(thumbnail, 310, 300)
    }
  }
}
</script>
