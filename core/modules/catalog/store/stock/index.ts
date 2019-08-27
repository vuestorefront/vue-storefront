import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import StockState from '../../types/StockState'

export const stockModule: Module<StockState, RootState> = {
  namespaced: true,
  actions,
  mutations,
  state: {
    cache: {}
  }
}
