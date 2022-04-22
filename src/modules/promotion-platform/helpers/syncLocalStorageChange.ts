import rootStore from '@vue-storefront/core/store'
import { storeViews } from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import { SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE } from '../types/StoreMutations';

function checkMultistoreKey (key: string, path: string): boolean {
  const { multistore, commonCache } = storeViews
  const storeView = currentStoreView();
  if ((!multistore && !storeView.storeCode) || (multistore && commonCache)) return key === path
  return key === `${storeView.storeCode}-${path}`
}

function getItemsFromStorage ({ key }) {
  if (checkMultistoreKey(key, 'shop/promotionPlatform/production-spot-countdown-expiration-date')) {
    const value = JSON.parse(localStorage[key]);
    rootStore.commit(`promotionPlatform/${SET_PRODUCTION_SPOT_COUNTDOWN_EXPIRATION_DATE}`, value);
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
