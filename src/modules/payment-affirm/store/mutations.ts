import Vue from 'vue';
import { MutationTree } from 'vuex';

import PaymentAffirmState from '../types/PaymentAffirmState';
import * as types from '../types/StoreMutations';

export const mutations: MutationTree<PaymentAffirmState> = {
  [types.SET_CHECKOUT_TOKEN]: (state, token: string | undefined) => {
    Vue.set(state, 'checkoutToken', token);
  }
}
