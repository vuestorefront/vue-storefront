import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const createPageLoadingQuery = ({ filterField, filterValues }): SearchQuery => {
  let query = new SearchQuery()

  if (filterValues) {
    query = query.applyFilter({ key: filterField, value: { like: filterValues } })
  }

  return query
}

export default createPageLoadingQuery
