import { ApolloQueryResult } from 'apollo-client'
import { apolloClient } from '../../index'
import { QueryResponse } from '../../types/Api'
import defaultQuery from './defaultQuery'
import { ShippingMethod, ShippingMethodQueryResult } from './../../types/GraphQL'

interface ShippingMethodData {
  shippingMethods: ShippingMethodQueryResult
}

const getShippingMethods = async (): Promise<ApolloQueryResult<ShippingMethodData>> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: {},
    fetchPolicy: 'no-cache'
  })
}

export default getShippingMethods
