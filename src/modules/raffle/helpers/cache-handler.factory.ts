import { MutationPayload } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import * as types from '../types/mutation';
import { SN_RAFFLE } from '../types/store-name';
import { RAFFLE_TOKEN, REFERRER_TOKEN } from '../types/local-storage-keys';

export function cacheHandlerFactory () {
  return (mutation: MutationPayload, state: RootState) => {
    const type = mutation.type;
    const raffleStorage = StorageManager.get(SN_RAFFLE);

    if (type.endsWith(types.PARTICIPANT_DATA_SET)) {
      if (!mutation.payload?.token) {
        raffleStorage.removeItem(RAFFLE_TOKEN);
        return;
      }

      raffleStorage.setItem(RAFFLE_TOKEN, mutation.payload.token);
    }

    if (type.endsWith(types.REFERRER_TOKEN_SET)) {
      if (!mutation.payload) {
        raffleStorage.removeItem(REFERRER_TOKEN);
        return;
      }

      raffleStorage.setItem(REFERRER_TOKEN, mutation.payload);
    }
  }
}
