<template>
  <div class="product align-center p15">
    <router-link :to="{ name: 'product', params: { id: product.id, slug: product.slug }}">
      <div class="product-image bg-lightgray">
        <transition name="fade" appear>
          <img v-if="instant" :src="thumbnail" :key="thumbnail"/>
          <img v-if="!instant" v-lazy="thumbnail" :key="thumbnail"/>
        </transition>  
      </div>
      <p class="mb0">{{ product.name }}</p>
      <span class="lh30 c-gray">{{ product.price | price }}</span>
    </router-link>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  props: ['instant'],
  mixins: [coreComponent('core/ProductTile')]
}
</script>

<style lang="scss" scoped>
@import '~src/themes/default/css/transitions';

.product-image > img {
  max-width: 242px;
  height: 100%;
  mix-blend-mode: multiply;
  transition: 0.3s all $motion-main;
}
.product-image:hover > img {
  transform: scale(1.1);
  transition: 0.3s all $motion-main;
}
.product-image {
  width: 100%;
  height: 300px;
  mix-blend-mode: multiply;
  overflow: hidden;
}
</style>
