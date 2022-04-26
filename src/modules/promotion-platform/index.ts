import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { CART_ADD_ITEM } from '@vue-storefront/core/modules/cart/store/mutation-types';

import { cacheHandlerFactory } from './helpers/cacheHandler.factory';
import initEventBusListeners from './helpers/initEventBusListeners';
import * as syncLocalStorageChange from './helpers/syncLocalStorageChange';
import { module } from './store';
import { CLEAR_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE, SN_PROMOTION_PLATFORM } from './types/StoreMutations';
import isCustomProduct from '../shared/helpers/is-custom-product.function';

export const PromotionPlatformModule: StorefrontModule = function ({ app, store }) {
  StorageManager.init(SN_PROMOTION_PLATFORM);

  store.registerModule(`${SN_PROMOTION_PLATFORM}`, module);

  EventBus.$once('cart-created', async (cartToken: string) => {
    if (!isServer) {
      await store.dispatch(`${SN_PROMOTION_PLATFORM}/synchronize`);
      store.dispatch(`${SN_PROMOTION_PLATFORM}/fetchCampaignContent`, { dataParam: app.$route.query.data, cartId: cartToken });
      initEventBusListeners(store, app);
    }
  });

  store.subscribe((mutation) => {
    if (mutation.type === `cart/${CART_ADD_ITEM}`) {
      if (!isCustomProduct(mutation.payload.product.sku)) {
        return;
      }

      const expirationDate = store.getters[`${SN_PROMOTION_PLATFORM}/productionSpotCountdownExpirationDate`];
      if (!expirationDate || expirationDate < Date.now()) {
        return;
      }

      store.commit(`${SN_PROMOTION_PLATFORM}/${CLEAR_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE}`);
    }
  });

  store.subscribe(cacheHandlerFactory());

  if (!app.$isServer) {
    syncLocalStorageChange.addEventListener();
  }
}
