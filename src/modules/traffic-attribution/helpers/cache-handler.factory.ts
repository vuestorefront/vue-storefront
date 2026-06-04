import { MutationPayload } from 'vuex';

import { Logger } from '@vue-storefront/core/lib/logger';
import LocalForageCacheDriver from '@vue-storefront/core/lib/store/storage';

import { MODULE_NAME } from '../types/store-name';
import { LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION } from '../types/local-storage-key';
import { SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION, CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION } from '../types/mutations';

export function cacheHandlerFactory (storage: LocalForageCacheDriver) {
  return (mutation: MutationPayload) => {
    const type = mutation.type;

    if (type.endsWith(SET_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION)) {
      storage.setItem(LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION, mutation.payload)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)();
        });
      return;
    }

    if (type.endsWith(CLEAR_LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION)) {
      storage.removeItem(LAST_MEANINGFUL_TRAFFIC_ATTRIBUTION)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)();
        });
    }
  };
}
