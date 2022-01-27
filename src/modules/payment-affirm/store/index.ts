import { Module } from 'vuex';
import PaymentAffirmState from '../types/PaymentAffirmState';
import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

export const module: Module<PaymentAffirmState, any> = {
  namespaced: true,
  state: {
    checkoutToken: undefined
  },
  mutations,
  actions,
  getters
}
