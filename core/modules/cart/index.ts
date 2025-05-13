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
import { CART_ITEM_PRICE_DICTIONARY, GET_CART_ITEM_PRICE } from './types/CartItemGetters';
import { CART_SET_PRODUCT_DISCOUNTED_PRICE, SN_CART } from './store/mutation-types';

import * as getterTypes from './store/getter-types';

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

const CART_SET_PRODUCT_DISCOUNTED_PRICE_MUTATION = `${SN_CART}/${CART_SET_PRODUCT_DISCOUNTED_PRICE}`;
const IS_SHIPPING_METHODS_SYNCING = `${SN_CART}/${getterTypes.IS_SHIPPING_METHODS_SYNCING}`
const IS_TOTALS_SYNCING = `${SN_CART}/${getterTypes.IS_TOTALS_SYNCING}`
const IS_PAYMENT_METHODS_SYNCING = `${SN_CART}/${getterTypes.IS_PAYMENT_METHODS_SYNCING}`
const IS_COUPON_PROCESSING = `${SN_CART}/${getterTypes.IS_COUPON_PROCESSING}`

export {
  LOCAL_CART_DATA_LOADED_EVENT,
  GET_CART_ITEM_PRICE,
  CART_ITEM_PRICE_DICTIONARY,
  CART_SET_PRODUCT_DISCOUNTED_PRICE_MUTATION,
  IS_SHIPPING_METHODS_SYNCING,
  IS_TOTALS_SYNCING,
  IS_PAYMENT_METHODS_SYNCING,
  IS_COUPON_PROCESSING
}
