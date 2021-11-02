import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { cacheHandlerFactory } from './helpers/cacheHandler.factory';
import initEventBusListeners from './helpers/initEventBusListeners';
import { module } from './store';
import { SN_PROMOTION_PLATFORM } from './types/StoreMutations';

export const PromotionPlatformModule: StorefrontModule = async function ({ app, store }) {
  StorageManager.init(SN_PROMOTION_PLATFORM);

  store.registerModule('promotionPlatform', module);

  if (!isServer) {
    await store.dispatch('promotionPlatform/synchronize');
    store.dispatch('promotionPlatform/fetchCampaignContent', app.$route.query.data);
    initEventBusListeners(store);
  }

  store.subscribe(cacheHandlerFactory());
}
