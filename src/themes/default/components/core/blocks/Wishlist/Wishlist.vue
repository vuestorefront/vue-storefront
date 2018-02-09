<template>
  <div class="wishlist fixed mw-100 bg-white c-darkgray" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 pointer c-darkgray" @click="closeWishlist">close</i>
      </div>
    </div>
    <h2 v-if="items.length" class="c-darkgray ml30">Wishlist</h2>
    <h4 v-if="!items.length" class="c-darkgray ml30">Your wishlist is empty.</h4>
    <div v-if="!items.length" class="ml30">
      Don't hesitate and <router-link to="/">browse our catalog</router-link> to find something beatufiul for you!
    </div>
    <ul class="products">
      <product @click.native="closeWishlist" v-for="product in items" :key="product.id" :product="product" />
    </ul>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [coreComponent('core/blocks/Wishlist/Wishlist')]
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
  .wishlist {
    height: 100vh;
    width: 800px;
    top: 0;
    right: 0;
    z-index: 3;
    transform: translateX(100%);
    transition: transform 300ms $motion-main;
    overflow-y: auto;
    overflow-x: hidden;

    &.active {
      transform: translateX(0)
    }
  }
  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
</style>
