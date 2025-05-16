import { Module } from 'vuex'

import RootState from '@vue-storefront/core/types/RootState'

import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'
import { OrdersHistoryState } from '../types/store/state'

export const ordersHistoryModule: Module<OrdersHistoryState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
