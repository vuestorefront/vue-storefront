import config from 'config'
import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import { parseCategoryPath } from '@vue-storefront/core/modules/breadcrumbs/helpers'
import { _prepareCategoryPathIds } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers';
import intersection from 'lodash-es/intersection'

import { Logger } from '@vue-storefront/core/lib/logger'

const getters: GetterTree<CategoryState, RootState> = {
  getBreadcrumbsFor: (state, getters) => category => {
    if (!category) {
      return []
    }

    let categoryHierarchyIds = _prepareCategoryPathIds(category)
    const skipRootCategories = config.icmaa_catalog.breadcrumbs.skipRootCategories
    if (skipRootCategories && skipRootCategories > 0) {
      categoryHierarchyIds.splice(0, skipRootCategories)
    }

    const resultCategoryList = categoryHierarchyIds
      .map(categoryId => getters.getCategoriesMap[categoryId])
      .filter(c => !!c)

    return parseCategoryPath(resultCategoryList)
  },
  isActiveFilterAttribute: (state, getters) => (attributeKey: string) => {
    return (getters.getCurrentFilters[attributeKey])
  },
  getNestedSubmenuFilterKeys: () => {
    let { filterTree } = config.products
    return [].concat(...Object.keys(filterTree).map(k => filterTree[k]))
  },
  isVisibleFilter: (state, getters) => (attributeKey: string): boolean => {
    if (!getters.getNestedSubmenuFilterKeys.includes(attributeKey)) {
      return true
    }

    let parents = []
    const currentFilterKeys = Object.keys(getters.getCurrentFilters)
    let { filterTree } = config.products
    for (let key in filterTree) {
      if (filterTree[key].includes(attributeKey)) {
        parents.push(key)
      }
    }

    return intersection(parents, currentFilterKeys).length > 0
  }
}

export default getters
