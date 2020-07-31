import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import { SearchQuery } from 'storefront-query-builder'
import config from 'config';
import { DataResolver } from './types/DataResolver';
import { Category } from 'core/modules/catalog-next/types/Category';

const getCategories = async ({
  parentId = null,
  filters = {},
  level = null,
  onlyActive = true,
  onlyNotEmpty = false,
  size = 4000,
  start = 0,
  sort = 'position:asc',
  includeFields = config.entities.optimize ? config.entities.category.includeFields : null,
  excludeFields = config.entities.optimize ? config.entities.category.excludeFields : null
}: DataResolver.CategorySearchOptions = {}): Promise<Category[]> => {
  let searchQuery = new SearchQuery()
  if (parentId) {
    searchQuery = searchQuery.applyFilter({ key: 'parent_id', value: { 'eq': parentId } })
  }
  if (level) {
    searchQuery = searchQuery.applyFilter({ key: 'level', value: { 'eq': level } })
  }

  for (var [key, value] of Object.entries(filters)) {
    if (value !== null) {
      if (Array.isArray(value)) {
        searchQuery = searchQuery.applyFilter({ key: key, value: { 'in': value } })
      } else if (typeof value === 'object') {
        searchQuery = searchQuery.applyFilter({ key: key, value: value })
      } else {
        searchQuery = searchQuery.applyFilter({ key: key, value: { 'eq': value } })
      }
    }
  }

  if (onlyActive === true) {
    searchQuery = searchQuery.applyFilter({ key: 'is_active', value: { 'eq': true } })
  }

  if (onlyNotEmpty === true) {
    searchQuery = searchQuery.applyFilter({ key: 'product_count', value: { 'gt': 0 } })
  }
  const response = await quickSearchByQuery({ entityType: 'category', query: searchQuery, sort: sort, size: size, start: start, includeFields: includeFields, excludeFields: excludeFields })
  return response.items as Category[]
}

export const CategoryService: DataResolver.CategoryService = {
  getCategories
}
