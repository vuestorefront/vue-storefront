import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CategoryExtrasState from '../types/CategoryExtrasState'

const mutations: MutationTree<CategoryExtrasState> = {
  [types.ICMAA_CATEGORY_EXTRAS_CHILDCATEGORIES_ADD] (state, categories) {
    const existingCategories = state.childCategoryIdMap.map(c => c.parentId)
    categories = categories.filter(c => !existingCategories.includes(c.parentId))
    state.childCategoryIdMap = [...state.childCategoryIdMap, ...categories]
  }
}

export default mutations
