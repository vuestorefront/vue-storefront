import { MutationPayload } from 'vuex';

import { Logger } from '@vue-storefront/core/lib/logger';
import LocalForageCacheDriver from '@vue-storefront/core/lib/store/storage';
import RootState from '@vue-storefront/core/types/RootState';

import { TrafficAttributionState } from '../types/state.interface';
import { MODULE_NAME } from '../types/store-name';
import { FIRST_TOUCH, LAST_TOUCH } from '../types/local-storage-key';
import {
  SET_FIRST_TOUCH,
  SET_LAST_TOUCH,
  MARK_FIRST_TOUCH_SENT,
  MARK_LAST_TOUCH_SENT
} from '../types/mutations';

export function cacheHandlerFactory (storage: LocalForageCacheDriver) {
  return (mutation: MutationPayload, rootState: RootState) => {
    const type = mutation.type;
    const state: TrafficAttributionState = (rootState as any)[MODULE_NAME];

    if (type.endsWith(SET_FIRST_TOUCH)) {
      storage.setItem(FIRST_TOUCH, mutation.payload)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)();
        });
      return;
    }

    if (type.endsWith(MARK_FIRST_TOUCH_SENT) && state.firstTouch) {
      storage.setItem(FIRST_TOUCH, state.firstTouch)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)();
        });
      return;
    }

    if (type.endsWith(SET_LAST_TOUCH)) {
      storage.setItem(LAST_TOUCH, mutation.payload)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)();
        });
      return;
    }

    if (type.endsWith(MARK_LAST_TOUCH_SENT) && state.lastTouch) {
      storage.setItem(LAST_TOUCH, state.lastTouch)
        .catch((reason: any) => {
          Logger.error(reason, MODULE_NAME)();
        });
    }
  };
}
