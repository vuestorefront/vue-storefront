import { ApolloQueryResult } from 'apollo-client'
import gql from 'graphql-tag'
import { apolloClient, locale, currency } from 'api-client/src/index'
import { ProductSearch } from 'api-client/src/types/Api'
import { Product } from 'api-client/src/types/GraphQL'
import defaultQuery from 'api-client/src/api/getProduct/defaultQuery'
import { buildProductWhere } from 'api-client/src/helpers/search'

const getProduct = async (search: ProductSearch): Promise<ApolloQueryResult<Product>> => {
  if (search.customQuery) {
    const { query, variables } = search.customQuery

    return await apolloClient.query<Product>({
      query: gql`${query}`,
      variables
    })
  }

  return await apolloClient.query<Product>({
    query: defaultQuery,
    variables: {
      where: buildProductWhere(search),
      skus: search.skus,
      limit: search.limit,
      offset: search.offset,
      locale,
      currency,
    }
  })
}

export default getProduct
