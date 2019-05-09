// import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CategoryState from './CategoryState'

const mutations: MutationTree<CategoryState> = {
  [types.CATEGORY_SET_PRODUCTS] (state, products = []) {
    state.products = products
  },
  [types.CATEGORY_SET_CATEGORIES] (state, categories = []) {
    state.categories = categories
  },
  [types.CATEGORY_SET_AVAILABLE_FILTERS] (state, availableFilters = {}) {
    state.availableFilters = availableFilters
  }
}

export default mutations
