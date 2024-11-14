import rootStore from '@vue-storefront/core/store'

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';

import { SN_RAFFLE } from '../types/store-name';
import { VERIFY_TOKEN } from '../types/action';
import { RAFFLE_TOKEN, REFERRER_TOKEN } from '../types/local-storage-keys';
import { PARTICIPANT_DATA_SET, REFERRER_TOKEN_SET } from '../types/mutation';

const clearItem = (mutationName: string) => {
  rootStore.commit(
    mutationName,
    undefined
  );
}

const clearParticipantData = () => {
  clearItem(`${SN_RAFFLE}/${PARTICIPANT_DATA_SET}`);
}
const clearReferrerToken = () => {
  clearItem(`${SN_RAFFLE}/${REFERRER_TOKEN_SET}`);
}

export function getItemsFromStorage ({ key }: {key: string | null}) {
  if (!key) {
    clearParticipantData();
    clearReferrerToken();
    return;
  }

  const isRaffleTokenChanged = checkMultiStoreLocalStorageKey(key, `${SN_RAFFLE}/${RAFFLE_TOKEN}`);
  const isReferrerTokenChanged = checkMultiStoreLocalStorageKey(key, `${SN_RAFFLE}/${REFERRER_TOKEN}`);

  if (!isRaffleTokenChanged && !isReferrerTokenChanged) {
    return;
  }

  const clearData = () => {
    if (isRaffleTokenChanged) {
      clearParticipantData();
    }

    if (isReferrerTokenChanged) {
      clearReferrerToken();
    }
  }

  const value = parseLocalStorageValue(localStorage[key]);

  if (!value) {
    clearData();
    return;
  }

  if (isRaffleTokenChanged) {
    rootStore.dispatch(`${SN_RAFFLE}/${VERIFY_TOKEN}`, value);
  }

  if (isReferrerTokenChanged) {
    rootStore.commit(
      `${SN_RAFFLE}/${REFERRER_TOKEN_SET}`,
      value
    );
  }
}
