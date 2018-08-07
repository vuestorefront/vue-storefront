export function prepareGraphQlBody (Query) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query

  let query = ``
  let queryVariables = {}

  console.log('Query.type: ', Query.type)

  switch (Query.type) {
    case 'product':
      query = `query ProductListFilters ($filter: ProductFilterInput, $search: String!, $pageSize: Int, $currentPage: Int, $sort: ProductSortInput) {
        products(
          filter: $filter
          search: $search
          pageSize: $pageSize
          currentPage: $currentPage
          sort: $sort
        )
        {
          hits
          aggregations
          suggest
        }
      }`
      queryVariables.search = Query.searchQuery.getSearchText()
      break
    case 'attribute':
      break
    default:

      break
  }

  const filters = Query.searchQuery.getAppliedFilters()
  queryVariables.filter = {}

  // Add aggregations for filters
  const allFilters = Query.searchQuery.getAvailableFilters()
  if (allFilters.length > 0) {
    for (let attrToFilter of allFilters) {
      queryVariables.filter[attrToFilter.field] = {}
    }
  }

  for (let _filter of filters) {
    // filter[_filter.type][_filter.attribute] = _filter.value
    queryVariables.filter[_filter.attribute] = _filter.value
    if (_filter.scope) {
      _filter.value['scope'] = _filter.scope
    }
  }

  queryVariables.sort = {}
  if (Query.sort !== '') {
    const sortParse = Query.sort.split(':')
    queryVariables.sort[sortParse[0]] = sortParse[1].toUpperCase()
  }

  queryVariables.pageSize = Query.size
  queryVariables.currentPage = (Query.from / Query.size) + 1

  const body = JSON.stringify({
    query,
    variables: queryVariables
  })

  return body
}
