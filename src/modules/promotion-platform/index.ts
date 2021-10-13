import { coreHooks } from '@vue-storefront/core/hooks';
import { StorefrontModule } from 'core/lib/modules';

import { module } from './store';

export const PromotionPlatformModule: StorefrontModule = function ({ store }) {
  store.registerModule('promotionPlatform', module);

  coreHooks.afterAppInit(() => {
    store.dispatch('promotionPlatform/fetchCampaignContent');
  })
}
