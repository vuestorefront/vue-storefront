import { Module } from 'vuex'
import { UrlState } from '../types/UrlState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { getters } from './getters'

export const urlStore: Module<UrlState, any> = {
  namespaced: true,
  mutations,
  actions,
  state,
  getters
}
