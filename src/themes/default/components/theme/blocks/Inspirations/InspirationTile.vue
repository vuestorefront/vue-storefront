<template>
  <div class="inspiration-tile">
    <router-link
      :to="{ name: product.type_id + '-product', params: { parentSku: product.sku, slug: product.slug }}"
    >
      <div class="product-image bg-lightgray">
        <img v-bind:src="thumbnail" class="product-thumbnail"/>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'inspirations',
  props: ['product'],
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, 310, 300)
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
