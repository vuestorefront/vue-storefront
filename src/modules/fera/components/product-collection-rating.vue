<template>
  <div
    class="product-collection-rating"
    v-if="productId"
    data-fera-widget="product_collection_rating"
    :data-product-id="productId"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductCollectionRating',
  props: {
    productId: {
      type: [String, Number],
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
