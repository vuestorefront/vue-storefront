import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import RecentlyViewedState from '../types/RecentlyViewedState'

export const recentlyViewedStore: Module<RecentlyViewedState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  actions,
  mutations
}
