<template>
  <div id="product-tile">
    Core Product Tile
    <!-- Product name and price -->
    {{ product._source.name[0] }} - {{ product._source.price[0].price }} 
    <!-- Add to cart button. Pass whole product as prop -->
  </div>
</template>

<script>
export default {
  name: 'product-tile',
  props: ['product']
}
</script>