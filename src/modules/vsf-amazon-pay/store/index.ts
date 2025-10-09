import { Module } from 'vuex'

import RootState from '@vue-storefront/core/types/RootState'

import { AmazonPayState } from '../types/AmazonPayState'
import { PAYMENT_NONCE } from '../types/getters';
import { CLEAR_PAYMENT_NONCE, SET_PAYMENT_NONCE } from '../types/mutations';

export const AmazonPayModule: Module<AmazonPayState, RootState> = {
  namespaced: true,
  state: {
    paymentNonce: null
  },
  mutations: {
    [SET_PAYMENT_NONCE] (state, nonce: string) {
      state.paymentNonce = nonce;
    },
    [CLEAR_PAYMENT_NONCE] (state) {
      state.paymentNonce = null;
    }
  },
  getters: {
    [PAYMENT_NONCE] (state): string | null {
      return state.paymentNonce;
    }
  }
}
