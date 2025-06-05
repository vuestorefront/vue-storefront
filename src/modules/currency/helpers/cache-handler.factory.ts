import { MutationPayload } from 'vuex';

import LocalForageCacheDriver from '@vue-storefront/core/lib/store/storage';

import { LocalStorageKey } from '../types/local-storage.key';
import { SET_AVAILABLE_CURRENCIES, SET_SELECTED_CURRENCY, SET_CURRENCY_RATES } from '../types/mutations';

export function cacheHandlerFactory (storage: LocalForageCacheDriver) {
  return (mutation: MutationPayload) => {
    const type = mutation.type;

    if (type.endsWith(SET_AVAILABLE_CURRENCIES)) {
      storage.setItem(LocalStorageKey.AVAILABLE_CURRENCIES, mutation.payload);
    }

    if (type.endsWith(SET_SELECTED_CURRENCY)) {
      storage.setItem(LocalStorageKey.SELECTED_CURRENCY, mutation.payload);
    }

    if (type.endsWith(SET_CURRENCY_RATES)) {
      storage.setItem(LocalStorageKey.CURRENCY_RATES, mutation.payload);
    }
  }
}
