import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { coreHooks } from '@vue-storefront/core/hooks';
import * as cartMutationTypes from '@vue-storefront/core/modules/cart/store/mutation-types'

import { cacheHandlerFactory } from './helpers/cacheHandler.factory';
import initEventBusListeners from './helpers/initEventBusListeners';
import { module } from './store';
import { SN_PROMOTION_PLATFORM } from './types/StoreMutations';

export const PromotionPlatformModule: StorefrontModule = function ({ app, store }) {
  StorageManager.init(SN_PROMOTION_PLATFORM);

  store.registerModule('promotionPlatform', module);

  const initModule = async () => {
    if (!isServer) {
      await store.dispatch('promotionPlatform/synchronize');
      const cartId = store.getters['cart/getCartToken'];
      store.dispatch('promotionPlatform/fetchCampaignContent', { dataParam: app.$route.query.data, cartId: cartId });
      initEventBusListeners(store);
    }
  }

  store.subscribe(async ({ type, payload }, state) => {
    if (type === 'cart/' + cartMutationTypes.CART_LOAD_CART_SERVER_TOKEN) {
      initModule()
    }
  })

  EventBus.$on('empty-cart-without-token-created', () => {
    initModule()
  });

  store.subscribe(cacheHandlerFactory());
}
