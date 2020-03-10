import Vue from 'vue'
import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import FilterVariant from '@vue-storefront/core/modules/catalog-next/types/FilterVariant'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import { DataResolver } from '@vue-storefront/core/data-resolver/types/DataResolver'
import { router } from '@vue-storefront/core/app'
import { products } from 'config'
import { changeFilterQuery } from '@vue-storefront/core/modules/catalog-next/helpers/filterHelpers'
import * as orgTypes from '@vue-storefront/core/modules/catalog-next/store/category/mutation-types'

import extendedCoreActions from './actions/index'

const actions: ActionTree<CategoryState, RootState> = {
  ...extendedCoreActions,
  async loadCategoryWithExtras ({ dispatch }, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category> {
    return dispatch('icmaaCategoryExtras/loadCategoryWithExtras', categorySearchOptions, { root: true })
  },
  async unsetSearchFilterForAttribute ({ dispatch, getters }, attributeKey: string) {
    let currentQuery = router.currentRoute[products.routerFiltersSource]
    let currentFilters = getters.getCurrentFilters[attributeKey] || []
    if (!Array.isArray(currentFilters)) {
      currentFilters = [ currentFilters ]
    }

    if (currentQuery[attributeKey] && currentFilters.length > 0) {
      currentFilters.forEach(filter => {
        currentQuery = changeFilterQuery({ currentQuery, filterVariant: filter })
      })
      await dispatch('changeRouterFilterParameters', currentQuery)
    }
  },
  async setSearchFilters ({ dispatch }, filterVariants: FilterVariant[] = []) {
    let currentQuery = {}
    filterVariants.forEach(filterVariant => {
      currentQuery = changeFilterQuery({currentQuery, filterVariant})
    })
    await dispatch('changeRouterFilterParameters', currentQuery)
  },
  async findCategoriesWithoutBlacklisting ({ dispatch, commit }, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category[]> {
    const categories = await dispatch('findCategories', categorySearchOptions)
    if (Vue.prototype.$cacheTags) {
      categories.forEach(category => {
        Vue.prototype.$cacheTags.add(`C${category.id}`)
      })
    }

    commit(orgTypes.CATEGORY_ADD_CATEGORIES, categories)

    return categories
  }
}

export default actions
