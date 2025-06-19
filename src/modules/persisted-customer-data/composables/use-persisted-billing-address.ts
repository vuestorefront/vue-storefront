import rootStore from '@vue-storefront/core/store';

import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';
import {
  SET_LAST_USED_CUSTOMER_CITY,
  SET_LAST_USED_CUSTOMER_STATE,
  SET_LAST_USED_CUSTOMER_ZIP_CODE,
  SET_LAST_USED_CUSTOMER_BILLING_COUNTRY
} from '../types/mutation';

interface PersistedBillingAddress {
  city?: string,
  state?: string,
  zipCode?: string,
  country?: string
}

export function usePersistedBillingAddress () {
  function persistLastUsedCustomerBillingAddress (address: PersistedBillingAddress) {
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_CITY}`, address.city);
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_STATE}`, address.state);
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_ZIP_CODE}`, address.zipCode);
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_LAST_USED_CUSTOMER_BILLING_COUNTRY}`, address.country);
  }

  return {
    persistLastUsedCustomerBillingAddress
  };
}
