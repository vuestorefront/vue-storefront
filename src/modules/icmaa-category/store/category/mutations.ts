import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from '@vue-storefront/core/modules/catalog-next/store/category/mutation-types'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'

const mutations: MutationTree<CategoryState> = {
  [types.CATEGORY_ADD_CATEGORY] (state, category: Category) {
    if (category) {
      Vue.set(state.categoriesMap, category.id, category)
    }
  },
  [types.CATEGORY_ADD_CATEGORIES] (state, categories: Category[] = []) {
    categories.forEach(category => {
      Vue.set(state.categoriesMap, category.id, category)
    })
  }
}

export default mutations
