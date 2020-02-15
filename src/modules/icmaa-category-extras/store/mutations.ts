import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CategoryExtrasState, { CategoryExtrasContentHeader, CategoryExtrasContentHeaderContent } from '../types/CategoryExtrasState'

interface CategoryExtrasContentHeaderOptions {
  identifier: string,
  payload: CategoryExtrasContentHeaderContent[]
}

const mutations: MutationTree<CategoryExtrasState> = {
  [types.ICMAA_CATEGORY_EXTRAS_CHILDCATEGORIES_ADD] (state, categories) {
    const existingCategories = state.childCategoryIdMap.map(c => c.parentId)
    categories = categories.filter(c => !existingCategories.includes(c.parentId))
    state.childCategoryIdMap = [...state.childCategoryIdMap, ...categories]
  },
  [types.ICMAA_CATEGORY_EXTRAS_CONTENT_HEADER_ADD] (state, { identifier, payload }: CategoryExtrasContentHeaderOptions) {
    Vue.set(state.categoryContentHeader, identifier, payload)
  },
  [types.ICMAA_CATEGORY_EXTRAS_CONTENT_HEADER_RMV] (state, identifier: string) {
    Vue.delete(state.categoryContentHeader, identifier)
  }
}

export default mutations
