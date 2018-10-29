import { Module } from 'vuex'
import { actions } from './actions'

export const module: Module<undefined, any> = {
  namespaced: true,
  actions,
}
