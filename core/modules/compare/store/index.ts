import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from "@vue-storefront/store/types/RootState"
import CompareState from '../types/CompareState'

export const module: Module<CompareState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
