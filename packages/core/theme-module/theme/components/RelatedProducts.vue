<template>
  <SfSection :title-heading="title" class="section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="(product, i) in products" :key="i">
          <SfProductCard
            :title="getProductName(product)"
            :image="getProductGallery(product)[0].normal"
            :regular-price="getProductPrice(product)"
            :link="`/p/${getProductSlug(product)}`"
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

import {
  getProductSlug,
  getProductName,
  getProductGallery,
  getProductPrice
} from '<%= options.helpers %>';

export default {
  name: 'RelatedProducts',
  setup() {
    return {
      getProductSlug,
      getProductName,
      getProductGallery,
      getProductPrice
    };
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
