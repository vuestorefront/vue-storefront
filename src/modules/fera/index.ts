import Vue from 'vue'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { getFeraScript } from './helpers/get-fera-script.function';
import ProductDetailRating from './components/product-detail-rating.vue';

export const FeraModule: StorefrontModule = ({ app, appConfig }) => {
  const apiPublicKey = appConfig.fera.apiPublicKey;

  if (!apiPublicKey) {
    return;
  }

  Vue.mixin({
    provide: {
    ProductRatingComponent: ProductDetailRating
  }
  });

  app.$extendedHead.append(getFeraScript(apiPublicKey));
}
