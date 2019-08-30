import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const createHierarchyLoadQuery = ({ id }): SearchQuery => {
  let query = new SearchQuery()

  if (id) {
    query = query.applyFilter({ key: 'identifier', value: { eq: id } })
  }

  return query
}

export default createHierarchyLoadQuery
