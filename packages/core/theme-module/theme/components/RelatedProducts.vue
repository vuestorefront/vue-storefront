<template>
  <SfSection :title-heading="title" class="section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="(product, i) in products" :key="i">
          <SfProductCard
            :title="productGetters.getName(product)"
            :image="productGetters.getCoverImage(product)"
            :regular-price="productGetters.getPrice(product).regular"
            :link="`/p/${productGetters.getSlug(product)}`"
            class="product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script lang="ts">

import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader
} from '@storefront-ui/vue';

import { productGetters } from '<%= options.composables %>';

export default {
  name: 'RelatedProducts',
  setup() {
    return { productGetters };
  },
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  }
};
</script>
