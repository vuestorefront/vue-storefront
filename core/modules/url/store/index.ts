import { Module } from 'vuex'
import { UrlState } from '../types/UrlState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'

export const module: Module<UrlState, any> = {
  namespaced: true,
  mutations,
  actions,
  state
}
