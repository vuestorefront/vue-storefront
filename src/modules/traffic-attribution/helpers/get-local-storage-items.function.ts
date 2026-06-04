import { Store } from 'vuex';

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';
import RootState from '@vue-storefront/core/types/RootState';

import { MODULE_NAME } from '../types/store-name';
import { FIRST_TOUCH, LAST_TOUCH } from '../types/local-storage-key';
import { SET_FIRST_TOUCH, SET_LAST_TOUCH } from '../types/mutations';

export function getItemsFromStorageFactory (store: Store<RootState>) {
  return function getItemsFromStorage ({ key }: StorageEvent) {
    if (!key) {
      return;
    }

    const isFirstTouchChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${FIRST_TOUCH}`
    );

    if (isFirstTouchChanged) {
      const value = parseLocalStorageValue(localStorage[key]);
      if (value) {
        store.commit(`${MODULE_NAME}/${SET_FIRST_TOUCH}`, value);
      }
      return;
    }

    const isLastTouchChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${LAST_TOUCH}`
    );

    if (isLastTouchChanged) {
      const value = parseLocalStorageValue(localStorage[key]);
      if (value) {
        store.commit(`${MODULE_NAME}/${SET_LAST_TOUCH}`, value);
      }
    }
  };
}
