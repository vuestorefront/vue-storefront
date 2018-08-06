export function prepareGraphQlBody (Query) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query
  const query = `query ProductListFilters ($filter: ProductFilterInput, $search: String!, $pageSize: Int, $currentPage: Int, $sort: ProductSortInput) {
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

  const search = Query.searchQuery.getSearchText()

  const filters = Query.searchQuery.getAppliedFilters()
  let filter = {}

  // Add aggregations for filters
  const allFilters = Query.searchQuery.getAvailableFilters()
  if (allFilters.length > 0) {
    for (let attrToFilter of allFilters) {
      filter[attrToFilter.field] = {}
    }
  }

  for (let _filter of filters) {
    // filter[_filter.type][_filter.attribute] = _filter.value
    filter[_filter.attribute] = _filter.value
    if (_filter.scope) {
      _filter.value['scope'] = _filter.scope
    }
  }

  let sort = {}
  if (Query.sort !== '') {
    const sortParse = Query.sort.split(':')
    sort[sortParse[0]] = sortParse[1].toUpperCase()
  }

  const pageSize = Query.size
  const currentPage = (Query.from / pageSize) + 1

  // const storeId = Query.storeId
  const body = JSON.stringify({
    query,
    variables: { filter, sort, pageSize, currentPage, search }
  })

  return body
}
