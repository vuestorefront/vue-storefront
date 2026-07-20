import { Module } from 'vuex'

import RootState from '@vue-storefront/core/types/RootState';

import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state';
import { CurrencyState } from '../types/currency-state.interface'

const storeModule: Module<CurrencyState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export { storeModule as module }
