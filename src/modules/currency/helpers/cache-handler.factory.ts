import { MutationPayload } from 'vuex';

import { Logger } from '@vue-storefront/core/lib/logger'
import LocalForageCacheDriver from '@vue-storefront/core/lib/store/storage';

import { LocalStorageKey } from '../types/local-storage.key';
import { SET_AVAILABLE_CURRENCIES, SET_SELECTED_CURRENCY, SET_CURRENCY_RATES } from '../types/mutations';
import { MODULE_NAME } from '../types/module-name';

export function cacheHandlerFactory (storage: LocalForageCacheDriver) {
  return (mutation: MutationPayload) => {
    const type = mutation.type;

    if (type.endsWith(SET_AVAILABLE_CURRENCIES)) {
      return storage.setItem(LocalStorageKey.AVAILABLE_CURRENCIES, mutation.payload)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)()
        });
    }

    if (type.endsWith(SET_SELECTED_CURRENCY)) {
      storage.setItem(LocalStorageKey.SELECTED_CURRENCY, mutation.payload)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)()
        });
    }

    if (type.endsWith(SET_CURRENCY_RATES)) {
      storage.setItem(LocalStorageKey.CURRENCY_RATES, mutation.payload)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)()
        });
    }
  }
}
