import { Module } from 'vuex'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const store: Module<any, any> = {
  namespaced: true,
  mutations,
  actions,
  getters
}