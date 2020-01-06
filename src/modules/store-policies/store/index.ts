import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import StorePoliciesState from '../types/StorePoliciesState'

export const module: Module<StorePoliciesState, RootState> = {
  namespaced: true,
  state: {
    policies: []
  },
  getters,
  actions,
  mutations
}
