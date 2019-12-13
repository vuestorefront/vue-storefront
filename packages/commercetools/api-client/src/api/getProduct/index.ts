import { ApolloQueryResult } from 'apollo-client'
import gql from 'graphql-tag'
import { apolloClient, locale, currency } from './../../index'
import { ProductSearch } from './../../types/Api'
import { Product } from './../../types/GraphQL'
import defaultQuery from './defaultQuery'
import { buildProductWhere } from './../../helpers/search'

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
