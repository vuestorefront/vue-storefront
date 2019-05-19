import { SearchRequest } from '@vue-storefront/core/types/search/SearchRequest';
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery';
import config from 'config';

export interface Product {
  id: number,
  name: any
}

const getProduct = async ():Promise<Product> => {
  const product:Product = {
    id: 1,
    name: 'sample'
  }
  return product
}

function getProducts(): Product[] {
  return [{
      id: 1,
      name: 'sample1'
    }, {
      id: 2,
      name: 'sample2'
    } 
  ]
}

const getCategories = async ({ parent = null, key = null, value = null, level = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.entities.optimize ? config.entities.category.includeFields : null, excludeFields = config.entities.optimize ? config.entities.category.excludeFields : null} = {}) => {
  let searchQuery = new SearchQuery()
  if (parent) {
    searchQuery = searchQuery.applyFilter({key: 'parent_id', value: {'eq': parent.id ? parent.id : parent }})
  }
  if (level) {
    searchQuery = searchQuery.applyFilter({key: 'level', value: {'eq': level}})
  }

  if (key) {
    if (Array.isArray(value)) {
      searchQuery = searchQuery.applyFilter({key: key, value: {'in': value}})
    } else {
      searchQuery = searchQuery.applyFilter({key: key, value: {'eq': value}})
    }
  }

  if (onlyActive === true) {
    searchQuery = searchQuery.applyFilter({key: 'is_active', value: {'eq': true}})
  }

  if (onlyNotEmpty === true) {
    searchQuery = searchQuery.applyFilter({key: 'product_count', value: {'gt': 0}})
  }
  return await quickSearchByQuery({ entityType: 'category', query: searchQuery, sort: sort, size: size, start: start, includeFields: includeFields, excludeFields: excludeFields })
}

interface ProductResolver {
  getProduct: (searchRequest:SearchRequest) => Promise<Product>,
  getProducts: () => Product[]
}

interface CategoryService {
  getCategories: (searchRequest?:any) => Promise<any>
}

export const ProductResolver: ProductResolver = {
  getProduct,
  getProducts
}

export const CategoryService: CategoryService = {
  getCategories
}
