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
  LAST_USED_CUSTOMER_BILLING_ADDRESS,
  CUSTOMER_DATA_HASH,
  PERSISTED_CUSTOMER_DATA
} from '../types/getter';
import { PersistedBillingAddress } from '../types/persisted-billing-address.interface';
import { PersistedCustomerData } from '../types/persisted-customer-data.interface';

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
  [LAST_USED_CUSTOMER_BILLING_ADDRESS] (state, getters, rootState, rootGetters): PersistedBillingAddress {
    const defaultBillingAddress = rootGetters['user/defaultBillingAddress'];

    if (defaultBillingAddress) {
      return {
        firstName: defaultBillingAddress.firstname,
        lastName: defaultBillingAddress.lastname,
        phoneNumber: defaultBillingAddress.telephone,
        city: defaultBillingAddress.city,
        state: defaultBillingAddress.region?.region || '',
        zipCode: defaultBillingAddress.postcode,
        country: defaultBillingAddress.country_id
      };
    }

    return state.lastUsedCustomerBillingAddress;
  },
  [PERSISTED_CUSTOMER_DATA] (state, getters, rootState): PersistedCustomerData {
    return {
      id: rootState.user.current?.id || '',
      email: getters[LAST_USED_CUSTOMER_EMAIL],
      firstName: getters[LAST_USED_CUSTOMER_FIRST_NAME],
      lastName: getters[LAST_USED_CUSTOMER_LAST_NAME],
      phoneNumber: getters[LAST_USED_CUSTOMER_PHONE_NUMBER],
      shippingCountry: getters[LAST_USED_CUSTOMER_SHIPPING_COUNTRY],
      billingAddress: getters[LAST_USED_CUSTOMER_BILLING_ADDRESS]
    }
  },
  [CUSTOMER_DATA_HASH] (state, getters): string {
    return sha3_224(JSON.stringify(getters[PERSISTED_CUSTOMER_DATA]));
  }
}
