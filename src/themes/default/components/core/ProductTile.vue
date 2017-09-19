<template>
  <div class="product col-md-3 p15 pb15 align-center">
    <div class="product-image"></div>
    <p class="mb0">{{ product.name }}</p>
    {{ product.price }} 
    <add-to-cart :product="product" /> 
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/ProductTile')]
}
</script>

<style scoped>
.product-image {
  width: 100%;
  height: 300px;
  background-color: #F2F2F2;
}
</style>
