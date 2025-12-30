import { MutationPayload } from 'vuex';

import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import * as types from '../types/mutation';
import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';
import { EMAIL, FIRST_NAME, LAST_NAME, PHONE_NUMBER, SHIPPING_COUNTRY, VAT_ID } from '../types/local-storage-key';

export function cacheHandlerFactory () {
  return (mutation: MutationPayload) => {
    const type = mutation.type;
    const persistedCustomerDataStorage = StorageManager.get(SN_PERSISTED_CUSTOMER_DATA);

    let localStorageKey: string | undefined;

    if (type.endsWith(types.SET_PERSISTED_CUSTOMER_EMAIL)) {
      localStorageKey = EMAIL;
    }

    if (type.endsWith(types.SET_PERSISTED_CUSTOMER_FIRST_NAME)) {
      localStorageKey = FIRST_NAME;
    }

    if (type.endsWith(types.SET_PERSISTED_CUSTOMER_LAST_NAME)) {
      localStorageKey = LAST_NAME;
    }

    if (type.endsWith(types.SET_PERSISTED_CUSTOMER_PHONE_NUMBER)) {
      localStorageKey = PHONE_NUMBER;
    }

    if (type.endsWith(types.SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY)) {
      localStorageKey = SHIPPING_COUNTRY;
    }

    if (type.endsWith(types.SET_PERSISTED_CUSTOMER_VAT_ID)) {
      localStorageKey = VAT_ID;
    }

    if (!localStorageKey) {
      return;
    }

    if (!mutation.payload) {
      persistedCustomerDataStorage.removeItem(localStorageKey);
      return;
    }

    persistedCustomerDataStorage.setItem(
      localStorageKey,
      mutation.payload
    );
  }
}
