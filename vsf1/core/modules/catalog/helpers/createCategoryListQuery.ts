import { SearchQuery } from 'storefront-query-builder'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'

const createCategoryListQuery = ({ parent, level, key, value, onlyActive, onlyNotEmpty }) => {
  let isCustomizedQuery = false
  let searchQuery = new SearchQuery()

  if (parent) {
    searchQuery = searchQuery.applyFilter({ key: 'parent_id', value: { 'eq': typeof parent === 'object' ? parent.id : parent } })
    isCustomizedQuery = true
  }

  if (level !== null) {
    searchQuery = searchQuery.applyFilter({ key: 'level', value: { 'eq': level } })
    if (level !== config.entities.category.categoriesDynamicPrefetchLevel && !isServer) {
      isCustomizedQuery = true
    }
  }

  if (key !== null) {
    if (Array.isArray(value)) {
      searchQuery = searchQuery.applyFilter({ key: key, value: { 'in': value } })
    } else {
      searchQuery = searchQuery.applyFilter({ key: key, value: { 'eq': value } })
    }
    isCustomizedQuery = true
  }

  if (onlyActive === true) {
    searchQuery = searchQuery.applyFilter({ key: 'is_active', value: { 'eq': true } })
  }

  if (onlyNotEmpty === true) {
    searchQuery = searchQuery.applyFilter({ key: 'product_count', value: { 'gt': 0 } })
    isCustomizedQuery = true
  }

  return { searchQuery, isCustomizedQuery }
}

export default createCategoryListQuery
