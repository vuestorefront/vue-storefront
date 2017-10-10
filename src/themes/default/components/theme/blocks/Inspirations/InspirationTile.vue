<template>
    <div class="inspiration-tile">
        <router-link :to="{ name: 'product', params: { id: product.id, slug: product.slug }}">
        <div class="product-image bg-lightgray">
            <img v-bind:src="thumbnail" class="product-thumbnail"/>
        </div>
        <p class="mb0">{{ product.name }}</p>
        {{ product.price | price }}
        </router-link>
        
    </div>
</template>

<script>
import { thumbnail } from '../../../../../../lib/filters'

export default {
  name: 'inspirations',
  props: ['product'],
  computed: {
    thumbnail () {
      return thumbnail(this.product.image, 310, 300)
    }
  }
}
</script>

<style scoped>
    .inspiration-tile {
        width: 100%;
        height: 350px;
    }
    .product-thumbnail {
       mix-blend-mode: multiply;
    }
</style>