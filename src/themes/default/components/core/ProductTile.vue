<template>
  <div class="product align-center">
    <router-link :to="{ name: 'product', params: { id: product.id, slug: product.url_key }}">
      <div class="product-image bg-lightgray">
        <img v-bind:src="thumbnail" />
      </div>
      <p class="mb0">{{ product.name }}</p>
      {{ product.price | price }}
    </router-link>
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
}
</style>
