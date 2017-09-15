<template>
  <div class="col-md-3">
    {{ product._source.name[0] }} - {{ product._source.price[0].price }} 
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

</style>
