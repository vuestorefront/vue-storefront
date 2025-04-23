<template>
  <script type="application/ld+json" v-html="structuredData" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { PRODUCT_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { getThumbnailPath, productThumbnailPath } from '@vue-storefront/core/helpers';

import { PriceHelper } from 'src/modules/shared';

export default Vue.extend({
  name: 'ProductStructuredData',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  computed: {
    productPriceDictionary (): Record<string, PriceHelper.ProductPrice> {
      return this.$store.getters[PRODUCT_PRICE_DICTIONARY];
    },
    structuredData (): string | undefined {
      const storeView = currentStoreView();

      const price = this.productPriceDictionary[this.product.id];
      const finalPrice = PriceHelper.getFinalPrice(price);

      const data = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        sku: this.product.sku,
        image: getThumbnailPath(productThumbnailPath(this.product)),
        name: this.product.name,
        description: this.product.short_description,
        brand: {
          '@type': 'Brand',
          name: storeView.name
        },
        offers: {
          '@type': 'Offer',
          price: finalPrice,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition'
        }
      }

      return JSON.stringify(data);
    }
  }
})
</script>
