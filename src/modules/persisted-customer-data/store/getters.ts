import { GetterTree } from 'vuex';
import { sha3_224 } from 'js-sha3';

import RootState from '@vue-storefront/core/types/RootState'

import { StoreState } from '../types/store-state.interface';
import {
  PERSISTED_CUSTOMER_EMAIL,
  PERSISTED_CUSTOMER_FIRST_NAME,
  PERSISTED_CUSTOMER_LAST_NAME,
  PERSISTED_CUSTOMER_PHONE_NUMBER,
  PERSISTED_CUSTOMER_SHIPPING_COUNTRY,
  PERSISTED_CUSTOMER_BILLING_ADDRESS,
  CUSTOMER_DATA_HASH,
  PERSISTED_CUSTOMER_DATA
} from '../types/getter';
import { PersistedBillingAddress } from '../types/persisted-billing-address.interface';
import { PersistedCustomerData } from '../types/persisted-customer-data.interface';

export const getters: GetterTree<StoreState, RootState> = {
  [PERSISTED_CUSTOMER_EMAIL] (state, getters, rootState, rootGetters): string {
    const loggedUserEmail = rootGetters['user/getUserEmail'];

    if (loggedUserEmail) {
      return loggedUserEmail;
    }

    return state.email || '';
  },
  [PERSISTED_CUSTOMER_FIRST_NAME] (state, getters, rootState): string {
    const loggedUserFirstName = rootState.user.current?.firstname;

    if (loggedUserFirstName) {
      return loggedUserFirstName;
    }

    return state.firstName || '';
  },
  [PERSISTED_CUSTOMER_LAST_NAME] (state, getters, rootState): string {
    const loggedUserLastName = rootState.user.current?.lastname;

    if (loggedUserLastName) {
      return loggedUserLastName;
    }

    return state.lastName || '';
  },
  [PERSISTED_CUSTOMER_PHONE_NUMBER] (state): string {
    return state.phoneNumber || '';
  },
  [PERSISTED_CUSTOMER_SHIPPING_COUNTRY] (state): string {
    return state.shippingCountry || '';
  },
  [PERSISTED_CUSTOMER_BILLING_ADDRESS] (state, getters, rootState, rootGetters): PersistedBillingAddress {
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
      email: getters[PERSISTED_CUSTOMER_EMAIL],
      firstName: getters[PERSISTED_CUSTOMER_FIRST_NAME],
      lastName: getters[PERSISTED_CUSTOMER_LAST_NAME],
      phoneNumber: getters[PERSISTED_CUSTOMER_PHONE_NUMBER],
      shippingCountry: getters[PERSISTED_CUSTOMER_SHIPPING_COUNTRY],
      billingAddress: getters[PERSISTED_CUSTOMER_BILLING_ADDRESS]
    }
  },
  [CUSTOMER_DATA_HASH] (state, getters): string {
    return sha3_224(JSON.stringify(getters[PERSISTED_CUSTOMER_DATA]));
  }
}
