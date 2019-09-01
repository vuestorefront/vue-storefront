import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const createSingleBlockQuery = ({ key, value }): SearchQuery => {
  let query = new SearchQuery()

  if (value) {
    query = query.applyFilter({ key, value: { like: value } })
  }

  return query
}

export default createSingleBlockQuery
