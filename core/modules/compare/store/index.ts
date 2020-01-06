import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import CompareState from '../types/CompareState'

export const compareStore: Module<CompareState, RootState> = {
  namespaced: true,
  state: {
    loaded: false,
    items: []
  },
  getters,
  actions,
  mutations
}
