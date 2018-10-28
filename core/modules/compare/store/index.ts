import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import CompareState from '../types/CompareState'

export const module: Module<CompareState, any> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
