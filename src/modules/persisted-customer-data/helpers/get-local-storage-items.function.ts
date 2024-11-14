import rootStore from '@vue-storefront/core/store'

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';

import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';
import { SET_LAST_USED_CUSTOMER_EMAIL, SET_LAST_USED_CUSTOMER_FIRST_NAME, SET_LAST_USED_CUSTOMER_LAST_NAME, SET_LAST_USED_CUSTOMER_PHONE_NUMBER, SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY } from '../types/mutation';
import { EMAIL, FIRST_NAME, LAST_NAME, PHONE_NUMBER, SHIPPING_COUNTRY } from '../types/local-storage-key';

const clearItem = (mutationName: string) => {
  rootStore.commit(
    mutationName,
    undefined
  );
}

const clearLastUsedCustomerEmail = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_EMAIL}`
  );
}
const clearLastUsedCustomerFirstName = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_FIRST_NAME}`
  );
}
const clearLastUsedCustomerLastName = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_LAST_NAME}`
  );
}
const clearLastUsedCustomerPhoneNumber = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_PHONE_NUMBER}`
  );
}
const clearLastUsedCustomerShippingCountry = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY}`
  );
}

export function getItemsFromStorage ({ key }: { key: string | null }) {
  if (!key) {
    clearLastUsedCustomerEmail();
    clearLastUsedCustomerFirstName();
    clearLastUsedCustomerLastName();
    clearLastUsedCustomerPhoneNumber();
    clearLastUsedCustomerShippingCountry();
    return;
  }

  const isEmailChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PERSISTED_CUSTOMER_DATA}/${EMAIL}`
  );
  const isFirstNameChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PERSISTED_CUSTOMER_DATA}/${FIRST_NAME}`
  );
  const isLastNameChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PERSISTED_CUSTOMER_DATA}/${LAST_NAME}`
  );
  const isPhoneNumberChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PERSISTED_CUSTOMER_DATA}/${PHONE_NUMBER}`
  );
  const isCountryChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PERSISTED_CUSTOMER_DATA}/${SHIPPING_COUNTRY}`
  );

  if (
    !isEmailChanged &&
    !isFirstNameChanged &&
    !isLastNameChanged &&
    !isPhoneNumberChanged &&
    !isCountryChanged
  ) {
    return;
  }

  const clearData = () => {
    if (isEmailChanged) {
      clearLastUsedCustomerEmail();
    }

    if (isFirstNameChanged) {
      clearLastUsedCustomerFirstName();
    }

    if (isLastNameChanged) {
      clearLastUsedCustomerLastName();
    }

    if (isPhoneNumberChanged) {
      clearLastUsedCustomerPhoneNumber();
    }

    if (isCountryChanged) {
      clearLastUsedCustomerShippingCountry();
    }
  }

  const value = parseLocalStorageValue(localStorage[key]);

  if (!value) {
    clearData();
    return;
  }

  let mutationName: string | undefined;

  if (isEmailChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_EMAIL}`;
  }

  if (isFirstNameChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_FIRST_NAME}`;
  }

  if (isLastNameChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_LAST_NAME}`;
  }

  if (isPhoneNumberChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_PHONE_NUMBER}`;
  }

  if (isCountryChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY}`;
  }

  if (!mutationName) {
    return;
  }

  rootStore.commit(
    mutationName,
    value
  );
}
