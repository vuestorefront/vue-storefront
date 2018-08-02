export function prepareGraphQlBody (Query) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query
  const query = `query ProductListFilters ($filter: ProductFilterTypeInput, $search: String!, $size: Int, $from: Int, $sort: ProductSortInput) {
    searchProducts(
      filter: $filter
      search: $search
      size: $size
      from: $from
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

  for (let _filter of filters) {
    // filter[_filter.type][_filter.attribute] = _filter.value
    let newAttribute = {}
    newAttribute[_filter.attribute] = _filter.value
    if (!(_filter.type in filter)) {
      filter[_filter.type] = {}
    }
    filter[_filter.type][_filter.attribute] = _filter.value
  }
  console.log(filter)

  const sortDir = Query.sortDir
  const sortBy = Query.sortBy
  let sort = {}
  sort[sortBy] = sortDir

  /* const filter = {
    terms:
    {
      color: [49, 58],
      category_ids: [3, 7, 4, 8]
    },
    range:
    {
      price1: {gte: 10.1, lte: 50.1}
    }
  } */

  const size = Query.size
  const from = Query.from

  // const storeId = Query.storeId

  const body = JSON.stringify({
    query,
    variables: { filter, sort, size, from, search }
  })

  return body
}
