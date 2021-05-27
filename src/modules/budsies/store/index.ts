import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { BudsiesState } from '../types/State'
import getters from './getters'

export const budsiesStore: Module<BudsiesState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
