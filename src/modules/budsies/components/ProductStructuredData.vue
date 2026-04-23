<template>
  <div style="display: none;">
    <script type="application/ld+json" v-html="structuredData" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { PRODUCT_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { getThumbnailPath, productThumbnailPath } from '@vue-storefront/core/helpers';
import getHostFromHeaders from '@vue-storefront/core/helpers/get-host-from-headers.function';

import { PriceHelper, DEFAULT_CURRENCY_CODE } from 'src/modules/shared';
import { getOfferUrl } from '../helpers/get-offer-url.function';
import { getMerchantReturnPolicy } from '../helpers/get-merchant-return-policy.function';
import { getOfferShippingDetails } from '../helpers/get-offer-shipping-details.function';

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

      const host = (this as any).$ssrContext
        ? getHostFromHeaders((this as any).$ssrContext.server.request.headers)
        : window.location.host;
      const siteBaseUrl = `https://${host}`;

      const priceValidUntil = new Date();
      priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
      const priceValidUntilStr = priceValidUntil.toISOString().split('T')[0];

      const shippingDetails = getOfferShippingDetails(this.product);

      const offer: Record<string, any> = {
        '@type': 'Offer',
        url: getOfferUrl(this.product, siteBaseUrl),
        price: finalPrice,
        priceCurrency: DEFAULT_CURRENCY_CODE,
        availability: 'https://schema.org/InStock',
        priceValidUntil: priceValidUntilStr,
        itemCondition: 'https://schema.org/NewCondition',
        hasMerchantReturnPolicy: getMerchantReturnPolicy(this.product)
      };

      if (shippingDetails) {
        offer.shippingDetails = shippingDetails;
      }

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
        offers: offer
      }

      return JSON.stringify(data);
    }
  }
})
</script>
