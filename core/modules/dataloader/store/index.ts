import { Module } from 'vuex'
import { DataLoaderState } from './types/DataLoaderState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'

export const module: Module<DataLoaderState, any> = {
  namespaced: true,
  mutations,
  actions,
  state
}