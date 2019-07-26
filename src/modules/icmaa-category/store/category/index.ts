import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import CategoryState from './CategoryState'

export const ExtendedCategoryStore: Module<CategoryState, any> = {
  getters,
  actions,
  mutations
}
