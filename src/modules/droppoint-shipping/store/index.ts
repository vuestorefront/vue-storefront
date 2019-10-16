import { Module } from 'vuex'
import { actions } from './actions'

export const module: Module<any, any> = {
  namespaced: true,
  actions
}
