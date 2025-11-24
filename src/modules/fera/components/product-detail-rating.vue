<template>
  <div
    class="product-detail-rating"
    v-if="productId"
    data-fera-widget="product_detail_rating"
    :data-product-id="productId"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ProductDetailRating',
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
