<template>
  <div id="product-tile">
    Core Product Tile
    <!-- Product name and price -->
    {{ product._source.name[0] }} - {{ product._source.price[0].price }} 
    <!-- Add to cart button. Pass whole product as prop -->
    <add-to-cart :product="product" /> 
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