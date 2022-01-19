import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
import { state } from './state'
import { UrlRewriteState } from './types/State'

export const urlRewriteStore: Module<UrlRewriteState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
