import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import TwitterState from '../types/TwitterState'

export const TwitterStore: Module<TwitterState, RootState> = {
  namespaced: true,
  state: {
    status: []
  },
  getters,
  actions,
  mutations
}
