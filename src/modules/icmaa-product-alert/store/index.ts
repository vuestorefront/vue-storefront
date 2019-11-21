import { Module } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductAlertState from '../types/ProductAlertState'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const ProductAlertStore: Module<ProductAlertState, RootState> = {
  namespaced: true,
  state: {
    stock: []
  },
  actions,
  getters,
  mutations
}
