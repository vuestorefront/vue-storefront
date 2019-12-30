import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import RootState from '@vue-storefront/core/types/RootState'
import OrderState from '../types/OrderState'

export const orderStore: Module<OrderState, RootState> = {
  namespaced: true,
  state: {
    last_order_confirmation: null,
    session_order_hashes: []
  },
  actions,
  mutations,
  getters
}
