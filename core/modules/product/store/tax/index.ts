import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '@vue-storefront/store/types/RootState'
import TaxState from '../../types/TaxState'

export const taxModule: Module<TaxState, RootState> = {
  namespaced: true,
  state: {
    rules: []
  },
  actions,
  mutations
}