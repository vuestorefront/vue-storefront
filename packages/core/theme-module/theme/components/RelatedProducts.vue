<template>
  <SfSection v-if="relatedProducts.length > 0" :title-heading="title" class="section">
    <SfCarousel class="product-carousel">
      <SfCarouselItem v-for="(product, i) in relatedProducts" :key="i">
        <SfProductCard
          :title="getProductName(product)"
          :image="getProductGallery(product)[0].normal"
          :regular-price="getProductPrice(product)"
          :link="`/p/${getProductSlug(product)}`"
          class="product-card"
        />
      </SfCarouselItem>
    </SfCarousel>
  </SfSection>
</template>

<script>
import { computed } from '@vue/composition-api';

import {
  SfCarousel,
  SfProductCard,
  SfSection,
} from '@storefront-ui/vue'

import { useProduct } from '<%= options.composables %>';
import {
  getProductCategories,
  getProductVariants,
  getProductSlug,
  getProductName,
  getProductGallery,
  getProductPrice,
  getProductId,
} from '<%= options.helpers %>';

export default {
  name: 'RelatedProducts',

  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
  },

  props: {
    title: String,
    product: Object,
  },

  setup({ product }) {
    const { products, search, loading, error } = useProduct();
    const categories = getProductCategories(product)
    const relatedProducts = computed(() => getProductVariants(products.value, { masters: true }).filter(prod => getProductId(prod) !== getProductId(product)))

    if (categories.length > 0) {
      const catIndex = Math.floor(Math.random() * categories.length)
      search({ catIds: [categories[catIndex]] })
    }

    return {
      relatedProducts,
      search,
      loading,
      error,
      getProductSlug,
      getProductName,
      getProductGallery,
      getProductPrice,
    }
  }
};
</script>
