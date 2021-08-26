import { SearchQuery } from 'storefront-query-builder'

const createPageLoadingQuery = ({ filterField, filterValues }): SearchQuery => {
  let query = new SearchQuery()

  if (filterValues) {
    query = query.applyFilter({ key: filterField, value: { like: filterValues } })
  }

  return query
}

export default createPageLoadingQuery
