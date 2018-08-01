export function prepareGraphQlBody (Query) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query
  const query = `query ProductListFilters ($filter: ProductFilterTypeInput, $search: String!, $size: Int, $from: Int) {
    searchProducts(
      filter: $filter
      search: $search
      size: $size
      from: $from
    )
    {
      hits
      aggregations
      suggest

    }
}`

  const queryFilters = `query ProductListFiltersNew ($search: String!) {
    searchProducts(
      filter: $filter
      sort: $sort
      size: $size
      from: $from
      search: $search
    )
    {
      hits
      aggregations
      suggest
    }
}`

  console.log(queryFilters)

  console.log(query)

  const search = Query.searchQuery.getSearchText()

  const filter = Query.searchQuery.getAppliedFilters()
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
    // variables: { filter, sort, from, size, search }
    variables: { filter, size, from, search }
  })

  return body
}
