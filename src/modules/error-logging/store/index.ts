import { Module } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState'

import ErrorLoggingState from '../type/ErrorLoggingState';
import { SET_TRACE_ID } from '../type/StoreMutations';

export const module: Module<ErrorLoggingState, RootState> = {
  namespaced: true,
  state: {
    traceId: ''
  },
  mutations: {
    [SET_TRACE_ID] (state, traceId: string): void {
      state.traceId = traceId;
    }
  },
  getters: {
    traceId: (state) => state.traceId
  }
}
