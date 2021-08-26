import { Module } from 'vuex'
import { UrlState } from '../types/UrlState'
import { actions } from './actions'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'

export const urlStore: Module<UrlState, any> = {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
