<template>
  <div class="product align-center">
    <div class="product-image"><img v-bind:src="thumbnail" /></div>
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
