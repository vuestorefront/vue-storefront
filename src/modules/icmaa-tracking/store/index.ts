import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import TrackingState from '../types/TrackingState'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const TrackingStore: Module<TrackingState, RootState> = {
  namespaced: true,
  state: {
    orders: []
  },
  actions,
  getters,
  mutations
}
