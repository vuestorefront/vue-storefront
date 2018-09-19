import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import RootState from '../../types/RootState'
import TaxState from './types/TaxState'

const tax: Module<TaxState, RootState> = {
  namespaced: true,
  state: {
    rules: []
  },
  actions,
  mutations
}

export default tax
