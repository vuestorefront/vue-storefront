import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { isServer } from '@vue-storefront/core/helpers'
import i18n from '@vue-storefront/core/i18n';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { localStorageSynchronizationFactory } from 'src/modules/shared';

import { cartCacheHandlerPlugin, getItemsFromStorage } from './helpers';
import cartClearHandlerFactory from './helpers/cartClearHandler.factory';
import { cartStore } from './store'
import { LOCAL_CART_DATA_LOADED_EVENT } from './types/local-cart-data-loaded.event';
import { ORDER_CONFLICT_EVENT } from '../order';

export const CartModule: StorefrontModule = function ({ store, router }) {
  StorageManager.init('cart')
  store.registerModule('cart', cartStore)

  if (!isServer) {
    store.dispatch('cart/load')

    const localStorageSynchronization = localStorageSynchronizationFactory(
      getItemsFromStorage,
      cartCacheHandlerPlugin
    );

    store.subscribe(localStorageSynchronization.setItems);
    store.subscribe(cartClearHandlerFactory(router));

    const onCartNotFoundErrorHandler = () => {
      store.dispatch(
        'cart/clear',
        {
          disconnect: true,
          sync: false
        }
      );
    };
    const onOrderConflictEventHandler = () => {
      onCartNotFoundErrorHandler();
      store.dispatch('notification/spawnNotification', {
        type: 'info',
        message: i18n.t('Looks like cart items were changed. Please review items and try to place order again.'),
        action1: { label: i18n.t('OK') }
      });
    }

    EventBus.$on('cart-not-found-error', onCartNotFoundErrorHandler);
    EventBus.$on(ORDER_CONFLICT_EVENT, onOrderConflictEventHandler);
  }
}

export {
  LOCAL_CART_DATA_LOADED_EVENT
}
