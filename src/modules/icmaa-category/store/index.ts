import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '../types/CategoryState'

export const CategoryStore: Module<CategoryState, RootState> = {
  namespaced: true,
  state: {
    lists: [],
    productListingWidget: []
  },
  getters,
  actions,
  mutations
}
