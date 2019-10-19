import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'

export const IcmaaCatalogStore: Module<CategoryState, any> = {
  actions,
  getters
}
