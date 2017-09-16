<template>
  <div id="product" class="col-md-3 pb25 align-center">
    <div class="product-image"></div>
    <p class="mb0">{{ product._source.name[0] }}</p>
    {{ product._source.price[0].price }} 
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
  height: 250px;
  background-color: #F2F2F2;
}
</style>
