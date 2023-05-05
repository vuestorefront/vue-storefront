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
import onWindowMouseLeaveEventHandler from './helpers/on-window-mouseleave-event-handler.function';
import { USER_LEAVING_WEBSITE } from './types/user-leaving-website.event';

export const PromotionPlatformModule: StorefrontModule = function ({ app, store }) {
  StorageManager.init(SN_PROMOTION_PLATFORM);
  store.registerModule(`${SN_PROMOTION_PLATFORM}`, module);

  if (!app.$isServer) {
    EventBus.$once('cart-created', async (cartToken: string) => {
      await store.dispatch(`${SN_PROMOTION_PLATFORM}/synchronize`);
      store.dispatch(`${SN_PROMOTION_PLATFORM}/updateActiveCampaign`, { dataParam: app.$route.query.data, cartId: cartToken });
      initEventBusListeners(store, app);
    });

    EventBus.$on(
      'cart-connected',
      (payload: {cartId: string, userToken: string}) =>
        store.dispatch('fetchActiveCampaign', payload)
    );

    store.subscribe((mutation) => {
      if (mutation.type === `cart/${CART_ADD_ITEM}`) {
        if (!isCustomProduct(mutation.payload.product.id)) {
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

    syncLocalStorageChange.addEventListener();

    document.body.addEventListener('mouseleave', onWindowMouseLeaveEventHandler);
  }
}

export {
  USER_LEAVING_WEBSITE
}
