import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { BudsiesState } from '../types/State'

export const module: Module<BudsiesState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {}
}
