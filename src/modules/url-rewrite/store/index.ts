import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import { actions } from './actions'
import { state } from './state'

export const urlRewriteStore: Module<{}, RootState> = {
  namespaced: true,
  state,
  actions
}
