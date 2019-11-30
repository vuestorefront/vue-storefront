<template>
  <div class="inspiration-tile w-100">
    <router-link
      :to="localizedRoute({ name: product.type_id + '-product', path: product.url_path, params: { parentSku: product.sku, slug: product.slug }})"
    >
      <div class="product-image bg-cl-secondary">
        <img :src="thumbnail" class="product-thumbnail">
      </div>
    </router-link>
  </div>
</template>

<script>
import config from 'config'
export default {
  name: 'Inspirations',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, config.products.thumbnails.width, config.products.thumbnails.height)
    }
  }
}
</script>

<style scoped>
  .inspiration-tile {
    height: 350px;
  }

  .product-thumbnail {
    mix-blend-mode: multiply;
  }
</style>
