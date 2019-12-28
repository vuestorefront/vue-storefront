import { Module } from 'vuex'
import { UrlState } from '../types/UrlState'
import { actions } from './actions'
import { state } from './state'

export const urlStore: Module<UrlState, any> = {
  namespaced: true,
  actions,
  state
}
