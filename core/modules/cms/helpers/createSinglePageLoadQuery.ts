import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const createSinglePageLoadQuery = ({ key, value }): SearchQuery => {
  let query = new SearchQuery()

  if (value) {
    query = query.applyFilter({ key, value: { like: value } })
  }

  return query
}

export default createSinglePageLoadQuery
