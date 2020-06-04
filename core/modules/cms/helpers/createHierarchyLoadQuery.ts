import { SearchQuery } from 'storefront-query-builder'

const createHierarchyLoadQuery = ({ id }): SearchQuery => {
  let query = new SearchQuery()

  if (id) {
    query = query.applyFilter({ key: 'identifier', value: { eq: id } })
  }

  return query
}

export default createHierarchyLoadQuery
