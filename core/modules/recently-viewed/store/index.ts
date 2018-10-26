import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/store/types/RootState'
import RecentlyViewedState from '../types/RecentlyViewedState'

export const module: Module<RecentlyViewedState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  actions,
  mutations
}

