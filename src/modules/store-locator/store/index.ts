import { Module } from 'vuex'
import { mutations } from './mutations'
import { state } from './state'
export const module: Module<any, any> = {
  namespaced: true,
  mutations,
  state
}
