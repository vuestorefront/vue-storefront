import { isServer } from '@vue-storefront/core/helpers';
import { nonReactiveState } from './index';
import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CategoryState from './CategoryState'
import { Category } from '../../types/Category'
import cloneDeep from 'lodash-es/cloneDeep'
import slugifyCategories from '@vue-storefront/core/modules/catalog/helpers/slugifyCategories'

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
  },
  [types.CATEGORY_UPD_MENU_CATEGORIES] (state, categories) {
    for (let category of categories.items) {
      category = slugifyCategories(category)
      const catExist = state.menuCategories.find(existingCat => existingCat.id === category.id)

      if (!catExist) {
        state.menuCategories.push(category)
      }
    }

    state.menuCategories.sort((catA, catB) => {
      if (catA.position && catB.position) {
        if (catA.position < catB.position) return -1
        if (catA.position > catB.position) return 1
      }
      return 0
    })
  }
}

export default mutations
