import rootStore from '@vue-storefront/core/store'
import { parseLocalStorageValue } from 'src/modules/shared';

import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';

import { CART_LOAD_CART, CART_LOAD_CART_SERVER_TOKEN, CART_SET_ITEMS_HASH, CART_UPD_TOTALS } from '../store/mutation-types';

export function getItemsFromStorage ({ key }) {
  const valueFromStorage = parseLocalStorageValue(localStorage[key]);

  if (checkMultiStoreLocalStorageKey(key, 'cart/current-cart')) {
    rootStore.commit(
      `cart/${CART_LOAD_CART}`,
      valueFromStorage,
    );
  } else if (checkMultiStoreLocalStorageKey(key, 'cart/current-totals')) {
    rootStore.commit(
      `cart/${CART_UPD_TOTALS}`,
      valueFromStorage,
    );
  } else if (checkMultiStoreLocalStorageKey(key, 'cart/current-cart-token')) {
    rootStore.commit(
      `cart/${CART_LOAD_CART_SERVER_TOKEN}`,
      valueFromStorage,
    );
  } else if (checkMultiStoreLocalStorageKey(key, 'cart/current-cart-hash')) {
    rootStore.commit(
      `cart/${CART_SET_ITEMS_HASH}`,
      valueFromStorage,
    );
  }
}
