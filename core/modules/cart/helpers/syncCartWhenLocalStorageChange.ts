import rootStore from '@vue-storefront/core/store'
import { storeViews } from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import { CART_LOAD_CART_SERVER_TOKEN, CART_SET_ITEMS_HASH } from '../store/mutation-types';

function checkMultistoreKey (key: string, path: string): boolean {
  const { multistore, commonCache } = storeViews
  const storeView = currentStoreView();
  if ((!multistore && !storeView.storeCode) || (multistore && commonCache)) return key === path
  return key === `${storeView.storeCode}-${path}`
}

function getItemsFromStorage ({ key }) {
  const valueFromStorage = localStorage[key] ? JSON.parse(localStorage[key]) : undefined;

  if (checkMultistoreKey(key, 'shop/cart/current-cart')) {
    rootStore.dispatch('cart/updateCart', { items: valueFromStorage })
  } else if (checkMultistoreKey(key, 'shop/cart/current-totals')) {
    rootStore.dispatch('cart/updateTotals', valueFromStorage)
  } else if (checkMultistoreKey(key, 'shop/cart/current-cart-token')) {
    rootStore.commit(`cart/${CART_LOAD_CART_SERVER_TOKEN}`, valueFromStorage);
  } else if (checkMultistoreKey(key, 'shop/cart/current-cart-hash')) {
    rootStore.commit(`cart/${CART_SET_ITEMS_HASH}`, valueFromStorage);
  }
}

function addEventListener () {
  window.addEventListener('storage', getItemsFromStorage)
}

function removeEventListener () {
  window.removeEventListener('storage', getItemsFromStorage)
}

export {
  addEventListener,
  removeEventListener
}
