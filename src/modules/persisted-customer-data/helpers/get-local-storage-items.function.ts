import rootStore from '@vue-storefront/core/store'

import { parseLocalStorageValue } from 'src/modules/shared';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';

import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';
import { SET_PERSISTED_CUSTOMER_EMAIL, SET_PERSISTED_CUSTOMER_FIRST_NAME, SET_PERSISTED_CUSTOMER_LAST_NAME, SET_PERSISTED_CUSTOMER_PHONE_NUMBER, SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY, SET_PERSISTED_CUSTOMER_VAT_ID } from '../types/mutation';
import { EMAIL, FIRST_NAME, LAST_NAME, PHONE_NUMBER, SHIPPING_COUNTRY, VAT_ID } from '../types/local-storage-key';

const clearItem = (mutationName: string) => {
  rootStore.commit(
    mutationName,
    undefined
  );
}

const clearLastUsedCustomerEmail = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_EMAIL}`
  );
}
const clearLastUsedCustomerFirstName = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_FIRST_NAME}`
  );
}
const clearLastUsedCustomerLastName = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_LAST_NAME}`
  );
}
const clearLastUsedCustomerPhoneNumber = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_PHONE_NUMBER}`
  );
}
const clearLastUsedCustomerShippingCountry = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY}`
  );
}
const clearLastUsedCustomerVatId = () => {
  clearItem(
    `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_VAT_ID}`
  );
}

export function getItemsFromStorage ({ key }: { key: string | null }) {
  if (!key) {
    clearLastUsedCustomerEmail();
    clearLastUsedCustomerFirstName();
    clearLastUsedCustomerLastName();
    clearLastUsedCustomerPhoneNumber();
    clearLastUsedCustomerShippingCountry();
    clearLastUsedCustomerVatId();
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
  const isVatIdChanged = checkMultiStoreLocalStorageKey(
    key,
    `${SN_PERSISTED_CUSTOMER_DATA}/${VAT_ID}`
  );

  if (
    !isEmailChanged &&
    !isFirstNameChanged &&
    !isLastNameChanged &&
    !isPhoneNumberChanged &&
    !isCountryChanged &&
    !isVatIdChanged
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

    if (isVatIdChanged) {
      clearLastUsedCustomerVatId();
    }
  }

  const value = parseLocalStorageValue(localStorage[key]);

  if (!value) {
    clearData();
    return;
  }

  let mutationName: string | undefined;

  if (isEmailChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_EMAIL}`;
  }

  if (isFirstNameChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_FIRST_NAME}`;
  }

  if (isLastNameChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_LAST_NAME}`;
  }

  if (isPhoneNumberChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_PHONE_NUMBER}`;
  }

  if (isCountryChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY}`;
  }

  if (isVatIdChanged) {
    mutationName = `${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_VAT_ID}`;
  }

  if (!mutationName) {
    return;
  }

  rootStore.commit(
    mutationName,
    value
  );
}
