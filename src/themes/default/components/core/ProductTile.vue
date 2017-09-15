<template>
  <div class="col-md-3">
    <div class="product-image">

    </div>
    <h3>{{ product._source.name[0] }}</h3>
    
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
