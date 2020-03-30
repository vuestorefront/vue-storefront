import { SearchQuery } from 'storefront-query-builder'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import { SearchResponse } from '@vue-storefront/core/types/search/SearchResponse'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { entities } from 'config'
import { getObjectHash } from 'icmaa-config/helpers/hash'

export const fetchCategoryById = ({ parentId }): Promise<SearchResponse> => {
  let searchQuery = new SearchQuery()
  searchQuery.applyFilter({ key: 'id', value: { 'eq': parentId } })

  return quickSearchByQuery({ entityType: 'category', query: searchQuery, size: 1, includeFields: entities.category.includeFields })
}

export const fetchChildCategories = async ({ parentId, sort = 'position:asc', level = 1, onlyShowTargetLevelItems = true, onlyActive = false, includeFields = entities.category.includeFields, collectedCategories = [] }): Promise<Category[]> => {
  let searchQuery = new SearchQuery()
  searchQuery.applyFilter({ key: 'path', value: { 'eq': parentId } })

  if (onlyActive) {
    searchQuery.applyFilter({ key: 'is_active', value: { 'eq': true } })
    searchQuery.applyFilter({ key: 'product_count', value: {'gt': 0} })
  }

  return quickSearchByQuery({ entityType: 'category', query: searchQuery, sort, includeFields, size: 5000 })
    .then(resp => {
      if (resp.items.length > 0) {
        resp.items.forEach(item => {
          if (!onlyShowTargetLevelItems || (onlyShowTargetLevelItems && item.level === level)) {
            collectedCategories.push(item)
          }
        })
      }

      return collectedCategories
    })
}

const SORT_PREFIX_REGEXP = /^(the\s)/gmi
export const extractPrefix = (name) => name.replace(SORT_PREFIX_REGEXP, '')

export const sortByLetter = (a: Category, b: Category) => {
  const [aName, bName] = [extractPrefix(a.name), extractPrefix(b.name)]
  return aName === bName ? 0 : aName < bName ? -1 : 1
}

export const getFilterHash = (filter: Record<string, any>|boolean) => {
  return filter !== false ? getObjectHash(filter as Record<string, any>) : false
}
