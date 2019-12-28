import SearchQuery from 'storefront-query-builder/lib/searchQuery'

const createHierarchyLoadQuery = ({ id }): SearchQuery => {
  let query = new SearchQuery()

  if (id) {
    query = query.applyFilter({ key: 'identifier', value: { eq: id } })
  }

  return query
}

export default createHierarchyLoadQuery
