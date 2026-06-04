import { Store } from 'vuex';

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';
import RootState from '@vue-storefront/core/types/RootState';

import { MODULE_NAME } from '../types/store-name';
import { LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION } from '../types/local-storage-key';
import {
  SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION,
  CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION
} from '../types/mutations';

export function getItemsFromStorageFactory (store: Store<RootState>) {
  return function getItemsFromStorage ({ key }: StorageEvent) {
    if (!key) {
      store.commit(`${MODULE_NAME}/${CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION}`);
      return;
    }

    const isLastMeaningfulChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION}`
    );

    if (!isLastMeaningfulChanged) {
      return;
    }

    const value = parseLocalStorageValue(localStorage[key]);

    if (!value) {
      store.commit(`${MODULE_NAME}/${CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION}`);
      return;
    }

    store.commit(`${MODULE_NAME}/${SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION}`, value);
  };
}
