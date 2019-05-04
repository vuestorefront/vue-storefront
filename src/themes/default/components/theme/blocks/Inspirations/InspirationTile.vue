<template>
  <div class="inspiration-tile w-100">
    <router-link
      :to="localizedRoute({ name: product.type_id + '-product', fullPath: product.url_path, params: { parentSku: product.sku, slug: product.slug }})"
    >
      <div class="product-image bg-cl-secondary">
        <img :src="thumbnail" class="product-thumbnail">
      </div>
    </router-link>
  </div>
</template>

<script>
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
      return this.getThumbnail(this.product.image, 310, 300)
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
