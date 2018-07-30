export function prepareGraphQlBody (searchQuery) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query
  const query = `query ProductListFilters ($searchText: String!) {
    searchProducts(
      search:$searchText
    )
    {
      hits
      aggregations
      suggest

    }
}`

  const queryFilters = `query ProductListFiltersNew ($searchText: String!) {
    searchProducts(
      search: $searchText
      filter: $filters
      sort: $sort
      size: $size
      from: $from
    )
    {
      hits
      aggregations
      suggest
    }
}`

  console.log(queryFilters)

  console.log(query)

  const searchText = searchQuery.body.getSearchText()
  /* const filters = []// searchQuery.body.getFilters()
  const sortDir = searchQuery.sortDir
  const sortBy = searchQuery.sortBy
  let sort = {}
  sort[sortBy] = sortDir
  const size = searchQuery.size
  const from = searchQuery.from */

  const body = JSON.stringify({
    query,
    // variables: { searchText, filters, sort, size, from }
    variables: { searchText }
  })

  return body
}
