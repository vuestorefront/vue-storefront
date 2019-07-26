import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CategoryState from './CategoryState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'

const mutations: MutationTree<CategoryState> = {
  [types.CATEGORY_SET_CURRENT_CATEGORY_ID] (state, category: Category) {
    state.currentId = category.id
  }
}

export default mutations
