interface CustomQuery {
  query: string
  variables: any
}

interface BaseSearch {
  customQuery?: CustomQuery
  limit?: number
  offset?: number
  sort?: string[]
}

interface ProductSearch extends BaseSearch {
  catId?: string
  skus?: string[]
}

interface CategorySearch extends BaseSearch {
  catId?: string
  slug?: string
}

export { ProductSearch, CategorySearch }
