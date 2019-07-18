import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryExtrasState from '../../types/CategoryExtrasState'

export const cmsCategoryExtrasStateKey = 'icmaaCmsCategoryExtras'
export const cmsCategoryExtrasStorageKey = 'category-extras'

export const CategoryExtrasStore: Module<CategoryExtrasState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  getters,
  actions,
  mutations
}
