<template>
  <div class="product align-center">
    <router-link :to="{ name: 'product', params: { id: product.id, slug: product.slug }}">
      <div class="product-image bg-lightgray">
        <img v-bind:src="thumbnail" class="product-thumbnail" />
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
.product-thumbnail {
  mix-blend-mode: multiply;
}
.product-image {
  width: 100%;
  height: 300px;
  mix-blend-mode: multiply;
}
</style>
