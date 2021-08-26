import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import RootState from '@vue-storefront/core/types/RootState'
import TaxState from '../../types/TaxState'

export const taxModule: Module<TaxState, RootState> = {
  namespaced: true,
  state: {
    rules: []
  },
  actions,
  mutations,
  getters
}
