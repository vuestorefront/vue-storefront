import rootStore from '@vue-storefront/core/store';
import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';
import { SET_USER_REFRESH_TOKEN, SET_USER_TOKEN, USER_INFO_LOADED, USER_ORDERS_HISTORY_LOADED, USER_TOKEN_CHANGED } from '../store/mutation-types';

import { CURRENT_REFRESH_TOKEN, CURRENT_TOKEN, CURRENT_USER, ORDERS_HISTORY } from '../types/local-storage-key';

const tokenMutationName = `user/${SET_USER_TOKEN}`;
const refreshTokenMutationName = `user/${SET_USER_REFRESH_TOKEN}`;
const currentUserMutationName = `user/${USER_INFO_LOADED}`;
const orderHistoryMutationName = `user/${USER_ORDERS_HISTORY_LOADED}`;  

const clearItem = (mutationName: string) => {
  rootStore.commit(mutationName, undefined);
}

export function getItemsFromStorage ({ key }: {key: string | null}) {
  if (!key) {
    clearItem(tokenMutationName);
    clearItem(refreshTokenMutationName);
    clearItem(currentUserMutationName);
    clearItem(orderHistoryMutationName);
    return;
  }

  let mutationName: string | undefined;

  if (checkMultiStoreLocalStorageKey(key, `user/${CURRENT_TOKEN}`)) {
    mutationName = tokenMutationName;
  }

  if (checkMultiStoreLocalStorageKey(key, `user/${CURRENT_REFRESH_TOKEN}`)) {
    mutationName = refreshTokenMutationName;
  }

  if (checkMultiStoreLocalStorageKey(key, `user/${ORDERS_HISTORY}`)) {
    mutationName = orderHistoryMutationName;
  }

  if (checkMultiStoreLocalStorageKey(key, `user/${CURRENT_USER}`)) {
    mutationName = currentUserMutationName;
  }

  if (!mutationName) {
    return;
  }

  const value = parseLocalStorageValue(localStorage[key]);

  if (!value) {
    clearItem(mutationName);
    return;
  }

  rootStore.commit(
    mutationName,
    value
  );
}
