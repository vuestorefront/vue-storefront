export function prepareGraphQlBody (gqlQuery) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query
  const query = `query DemoProductList ($searchText: String!) {
    ProductList(query: $searchText) {
      _index
      _id
      _source
    }
  }`

  let searchText = ''
  if (typeof gqlQuery.body.queryText !== 'undefined') {
    searchText = gqlQuery.body.queryText
  }

  let body = JSON.stringify({
    query,
    variables: { searchText }
  })

  return body
}
