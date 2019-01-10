import { Module } from 'vuex'
import { ExampleState } from '../types/ExampleState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const module: Module<ExampleState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters
}