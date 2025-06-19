import Vue from 'vue';
import { MutationTree } from 'vuex';

import { StoreState } from '../types/store-state.interface';
import {
  SET_LAST_USED_CUSTOMER_EMAIL,
  SET_LAST_USED_CUSTOMER_FIRST_NAME,
  SET_LAST_USED_CUSTOMER_LAST_NAME,
  SET_LAST_USED_CUSTOMER_PHONE_NUMBER,
  SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY,
  SET_LAST_USED_CUSTOMER_BILLING_ADDRESS
} from '../types/mutation';
import { PersistedBillingAddress } from '../types/persisted-billing-address.interface';

export const mutations: MutationTree<StoreState> = {
  [SET_LAST_USED_CUSTOMER_EMAIL] (state, payload: string | undefined): void {
    Vue.set(state, 'email', payload);
  },
  [SET_LAST_USED_CUSTOMER_FIRST_NAME] (state, payload: string | undefined): void {
    Vue.set(state, 'firstName', payload);
  },
  [SET_LAST_USED_CUSTOMER_LAST_NAME] (state, payload: string | undefined): void {
    Vue.set(state, 'lastName', payload);
  },
  [SET_LAST_USED_CUSTOMER_PHONE_NUMBER] (state, payload: string | undefined): void {
    Vue.set(state, 'phoneNumber', payload);
  },
  [SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY] (state, payload: string | undefined): void {
    Vue.set(state, 'shippingCountry', payload);
  },
  [SET_LAST_USED_CUSTOMER_BILLING_ADDRESS] (state, payload: PersistedBillingAddress): void {
    state.lastUsedCustomerBillingAddress = payload;
  }
}
