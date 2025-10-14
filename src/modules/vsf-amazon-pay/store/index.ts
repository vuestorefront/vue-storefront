import { Module } from 'vuex'

import RootState from '@vue-storefront/core/types/RootState'

import { AmazonPayState } from '../types/AmazonPayState'
import { AMAZON_SESSION_ID } from '../types/getters';
import { CLEAR_AMAZON_SESSION_ID, SET_AMAZON_SESSION_ID } from '../types/mutations';

export const AmazonPayModule: Module<AmazonPayState, RootState> = {
  namespaced: true,
  state: {
    sessionId: null
  },
  mutations: {
    [SET_AMAZON_SESSION_ID] (state, sessionId: string) {
      state.sessionId = sessionId;
    },
    [CLEAR_AMAZON_SESSION_ID] (state) {
      state.sessionId = null;
    }
  },
  getters: {
    [AMAZON_SESSION_ID] (state): string | null {
      return state.sessionId;
    }
  }
}
