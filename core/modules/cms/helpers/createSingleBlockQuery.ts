import SearchQuery from 'storefront-query-builder/lib/searchQuery'

const createSingleBlockQuery = ({ key, value }): SearchQuery => {
  let query = new SearchQuery()

  if (value) {
    query = query.applyFilter({ key, value: { like: value } })
  }

  return query
}

export default createSingleBlockQuery
