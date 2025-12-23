import Vue from 'vue'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { once } from '@vue-storefront/core/helpers'

import { getFeraScript } from './helpers/get-fera-script.function';
import ProductDetailRating from './components/product-detail-rating.vue';
import ProductCollectionRating from './components/product-collection-rating.vue';

export const FeraModule: StorefrontModule = ({ app, appConfig }) => {
  const apiPublicKey = (appConfig.fera.apiPublicKey || '').trim();

  if (!apiPublicKey) {
    return;
  }

  once('__VUE_EXTEND__FERA__', () => {
    Vue.mixin({
      provide: {
        ProductRatingComponent: ProductDetailRating,
        ProductCollectionRatingComponent: ProductCollectionRating
      }
    });
  })

  app.$extendedHead.append(getFeraScript(apiPublicKey));
}
