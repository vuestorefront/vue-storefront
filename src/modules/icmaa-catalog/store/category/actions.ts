import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import FilterVariant from '@vue-storefront/core/modules/catalog-next/types/FilterVariant'
import { router } from '@vue-storefront/core/app'
import { products } from 'config'
import { changeFilterQuery } from '@vue-storefront/core/modules/catalog-next/helpers/filterHelpers'

import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<CategoryState, RootState> = {
  async unsetSearchFilterForAttribute ({ dispatch, getters }, attributeKey: string) {
    let currentQuery = router.currentRoute[products.routerFiltersSource]
    let currentFilters = getters.getCurrentFilters[attributeKey] || []
    if (!Array.isArray(currentFilters)) {
      currentFilters = [ currentFilters ]
    }

    if (currentQuery[attributeKey] && currentFilters.length > 0) {
      currentFilters.forEach(filter => {
        currentQuery = changeFilterQuery({ currentQuery, filterVariant: filter })
      });
      await dispatch('changeRouterFilterParameters', currentQuery)
    }
  },
  async setSearchFilters ({ dispatch }, filterVariants: FilterVariant[] = []) {
    let currentQuery = {}
    filterVariants.forEach(filterVariant => {
      currentQuery = changeFilterQuery({currentQuery, filterVariant})
    })
    await dispatch('changeRouterFilterParameters', currentQuery)
  }
}

export default actions
