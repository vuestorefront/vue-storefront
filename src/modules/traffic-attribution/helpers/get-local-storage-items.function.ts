import { Store } from 'vuex';

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';
import RootState from '@vue-storefront/core/types/RootState';

import { MODULE_NAME } from '../types/store-name';
import { FIRST_TOUCH, LAST_TOUCH } from '../types/local-storage-key';
import {
  SET_FIRST_TOUCH,
  SET_LAST_TOUCH,
  CLEAR_FIRST_TOUCH,
  CLEAR_LAST_TOUCH
} from '../types/mutations';

export function getItemsFromStorageFactory (store: Store<RootState>) {
  return function getItemsFromStorage ({ key, newValue }: StorageEvent) {
    if (!key) {
      return;
    }

    const isFirstTouchChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${FIRST_TOUCH}`
    );

    if (isFirstTouchChanged) {
      const value = parseLocalStorageValue(newValue || undefined);
      if (value) {
        store.commit(MODULE_NAME + '/' + SET_FIRST_TOUCH, value);
        return;
      }

      store.commit(MODULE_NAME + '/' + CLEAR_FIRST_TOUCH);
      return;
    }

    const isLastTouchChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${LAST_TOUCH}`
    );

    if (isLastTouchChanged) {
      const value = parseLocalStorageValue(newValue || undefined);
      if (value) {
        store.commit(MODULE_NAME + '/' + SET_LAST_TOUCH, value);
        return;
      }

      store.commit(MODULE_NAME + '/' + CLEAR_LAST_TOUCH);
    }
  };
}
