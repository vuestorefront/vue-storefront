<template>
  <div class="product align-center">
    <router-link :to="{ name: 'product', params: { id: product.id, slug: product.slug }}">
      <div class="product-image bg-lightgray">
        <img v-bind:src="thumbnail"/>
      </div>
      <p class="mb0">{{ product.name }}</p>
      <span class="lh30 c-gray">{{ product.price | price }}</span>
    </router-link>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/ProductTile')]
}
</script>

<style scoped>
.product-image > img {
  mix-blend-mode: multiply;
  transition: 0.5s all;
}
.product-image:hover > img {
  transform: scale(1.1);
  transition: 0.5s all;
}
.product-image {
  width: 100%;
  height: 300px;
  mix-blend-mode: multiply;
  overflow: hidden;
}
</style>
