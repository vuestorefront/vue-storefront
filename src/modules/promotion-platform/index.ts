import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { CART_ADD_ITEM } from '@vue-storefront/core/modules/cart/store/mutation-types';

import { cacheHandlerFactory } from './helpers/cacheHandler.factory';
import initEventBusListeners from './helpers/initEventBusListeners';
import * as syncLocalStorageChange from './helpers/syncLocalStorageChange';
import { module } from './store';
import { SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE, SN_PROMOTION_PLATFORM } from './types/StoreMutations';
import isCustomProduct from '../shared/helpers/is-custom-product.function';

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

  store.subscribe((mutation) => {
    if (mutation.type === `cart/${CART_ADD_ITEM}`) {
      const expirationDate = store.getters['promotionPlatform/productionSpotCountdownExpirationDate'];
      if (!expirationDate || expirationDate < Date.now() || !isCustomProduct(mutation.payload.product.sku)) {
        return;
      }

      store.commit(`promotionPlatform/${SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE}`, undefined);
    }
  });

  store.subscribe(cacheHandlerFactory());

  if (!app.$isServer) {
    syncLocalStorageChange.addEventListener();
  }
}
