import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { cacheHandlerFactory } from './helpers/cacheHandler.factory';
import initEventBusListeners from './helpers/initEventBusListeners';
import { module } from './store';
import { SN_PROMOTION_PLATFORM } from './types/StoreMutations';

export const PromotionPlatformModule: StorefrontModule = function ({ app, store }) {
  StorageManager.init(SN_PROMOTION_PLATFORM);

  store.registerModule('promotionPlatform', module);

  EventBus.$once('cart-created', async (cartToken: string) => {
    if (!isServer) {
      await store.dispatch('promotionPlatform/synchronize');
      store.dispatch('promotionPlatform/fetchCampaignContent', { dataParam: app.$route.query.data, cartId: cartToken });
      initEventBusListeners(store, app);
    }
  });

  store.subscribe(cacheHandlerFactory());
}
