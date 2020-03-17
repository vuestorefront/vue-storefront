import { isServer } from '@vue-storefront/core/helpers';
import { nonReactiveState } from './index';
import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CategoryState from './CategoryState'
import { Category } from '../../types/Category'
import cloneDeep from 'lodash-es/cloneDeep'

const mutations: MutationTree<CategoryState> = {
  [types.CATEGORY_SET_PRODUCTS] (state, products = []) {
    nonReactiveState.products = cloneDeep(products)
    state.products = isServer ? products : products.map(prod => prod.sku)
  },
  [types.CATEGORY_ADD_PRODUCTS] (state, products = []) {
    nonReactiveState.products.push(...cloneDeep(products))
    state.products.push(...(isServer ? products : products.map(prod => prod.sku)))
  },
  [types.CATEGORY_ADD_CATEGORY] (state, category: Category) {
    if (category) {
      Vue.set(state.categoriesMap, category.id, category)
    }
  },
  [types.CATEGORY_ADD_CATEGORIES] (state, categories: Category[] = []) {
    if (categories.length) {
      let newCategoriesEntry = {}
      categories.forEach(category => {
        newCategoriesEntry[category.id] = category
      })
      state.categoriesMap = Object.assign({}, state.categoriesMap, newCategoriesEntry)
    }
  },
  [types.CATEGORY_ADD_NOT_FOUND_CATEGORY_IDS] (state, categoryIds: string[] = []) {
    state.notFoundCategoryIds = [...state.notFoundCategoryIds, ...categoryIds]
  },
  [types.CATEGORY_SET_CATEGORY_FILTERS] (state, { category, filters }) {
    Vue.set(state.filtersMap, category.id, filters)
  },
  [types.CATEGORY_SET_SEARCH_PRODUCTS_STATS] (state, stats = {}) {
    state.searchProductsStats = stats
  }
}

export default mutations
