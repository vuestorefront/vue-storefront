export function prepareGraphQlBody (gqlQuery) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query
  const query = `query DemoProductList ($searchText: String!) {
    ProductList(query: $searchText) {
      _index
      _id
      _source {
        id
        name
        sku
        price
        status
        visibility
        type_id
        weight
        description
        image
        url_key
        small_image
        thumbnail
        price
        max_price
        minimal_price
        regular_price
        max_regular_price
        minimal_regular_price
        final_price
      }
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
