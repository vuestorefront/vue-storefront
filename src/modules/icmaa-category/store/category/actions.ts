// import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import CategoryState from './CategoryState'
import { CATEGORY_ADD_CATEGORY } from '@vue-storefront/core/modules/catalog-next/store/category/mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import { CategoryService } from '@vue-storefront/core/data-resolver'
import { DataResolver } from '@vue-storefront/core/data-resolver/types/DataResolver'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'

const actions: ActionTree<CategoryState, RootState> = {
  async loadCategory ({ commit }, options: { searchOptions: DataResolver.CategorySearchOptions, setToCurrent?: boolean }): Promise<Category> {
    const categories: Category[] = await CategoryService.getCategories(options.searchOptions)
    const category: Category = categories && categories.length ? categories[0] : null
    commit(CATEGORY_ADD_CATEGORY, category)
    if (category && options.setToCurrent === true) {
      commit(types.CATEGORY_SET_CURRENT_CATEGORY_ID, category)
    }
    return category
  }
}

export default actions
