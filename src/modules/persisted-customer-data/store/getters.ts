import { GetterTree } from 'vuex';
import { sha3_224 } from 'js-sha3';

import RootState from '@vue-storefront/core/types/RootState'

import { StoreState } from '../types/store-state.interface';
import {
  LAST_USED_CUSTOMER_EMAIL,
  LAST_USED_CUSTOMER_FIRST_NAME,
  LAST_USED_CUSTOMER_LAST_NAME,
  LAST_USED_CUSTOMER_PHONE_NUMBER,
  LAST_USED_CUSTOMER_SHIPPING_COUNTRY,
  LAST_USED_CUSTOMER_CITY,
  LAST_USED_CUSTOMER_STATE,
  LAST_USED_CUSTOMER_ZIP_CODE,
  LAST_USED_CUSTOMER_BILLING_COUNTRY,
  CUSTOMER_DATA_HASH
} from '../types/getter';

export const getters: GetterTree<StoreState, RootState> = {
  [LAST_USED_CUSTOMER_EMAIL] (state, getters, rootState, rootGetters): string {
    const loggedUserEmail = rootGetters['user/getUserEmail'];

    if (loggedUserEmail) {
      return loggedUserEmail;
    }

    return state.email || '';
  },
  [LAST_USED_CUSTOMER_FIRST_NAME] (state, getters, rootState): string {
    const loggedUserFirstName = rootState.user.current?.firstname;

    if (loggedUserFirstName) {
      return loggedUserFirstName;
    }

    return state.firstName || '';
  },
  [LAST_USED_CUSTOMER_LAST_NAME] (state, getters, rootState): string {
    const loggedUserLastName = rootState.user.current?.lastname;

    if (loggedUserLastName) {
      return loggedUserLastName;
    }

    return state.lastName || '';
  },
  [LAST_USED_CUSTOMER_PHONE_NUMBER] (state): string {
    return state.phoneNumber || '';
  },
  [LAST_USED_CUSTOMER_SHIPPING_COUNTRY] (state): string {
    return state.shippingCountry || '';
  },
  [LAST_USED_CUSTOMER_CITY] (state, getters, rootState, rootGetters): string {
    const defaultBillingAddress = rootGetters['user/defaultBillingAddress'];

    if (defaultBillingAddress && defaultBillingAddress.city) {
      return defaultBillingAddress.city;
    }

    return state.city || '';
  },
  [LAST_USED_CUSTOMER_STATE] (state, getters, rootState, rootGetters): string {
    const defaultBillingAddress = rootGetters['user/defaultBillingAddress'];

    if (defaultBillingAddress && defaultBillingAddress.region?.region) {
      return defaultBillingAddress.region.region;
    }

    return state.state || '';
  },
  [LAST_USED_CUSTOMER_ZIP_CODE] (state, getters, rootState, rootGetters): string {
    const defaultBillingAddress = rootGetters['user/defaultBillingAddress'];

    if (defaultBillingAddress && defaultBillingAddress.postcode) {
      return defaultBillingAddress.postcode;
    }

    return state.zipCode || '';
  },
  [LAST_USED_CUSTOMER_BILLING_COUNTRY] (state, getters, rootState, rootGetters): string {
    const defaultBillingAddress = rootGetters['user/defaultBillingAddress'];

    if (defaultBillingAddress && defaultBillingAddress.country_id) {
      return defaultBillingAddress.country_id;
    }

    return state.billingCountry || '';
  },
  [CUSTOMER_DATA_HASH] (state, getters): string {
    const customerData = {
      email: getters[LAST_USED_CUSTOMER_EMAIL],
      firstName: getters[LAST_USED_CUSTOMER_FIRST_NAME],
      lastName: getters[LAST_USED_CUSTOMER_LAST_NAME],
      phoneNumber: getters[LAST_USED_CUSTOMER_PHONE_NUMBER],
      city: getters[LAST_USED_CUSTOMER_CITY],
      state: getters[LAST_USED_CUSTOMER_STATE],
      zipCode: getters[LAST_USED_CUSTOMER_ZIP_CODE],
      billingCountry: getters[LAST_USED_CUSTOMER_BILLING_COUNTRY]
    };

    return sha3_224(JSON.stringify(customerData));
  }
}
