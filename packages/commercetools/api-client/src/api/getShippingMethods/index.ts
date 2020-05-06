import { ApolloQueryResult } from 'apollo-client';
import { apolloClient, locale } from '../../index';
import defaultQuery from './defaultQuery';
import { ShippingMethodQueryResult } from './../../types/GraphQL';

interface ShippingMethodData {
  shippingMethods: ShippingMethodQueryResult;
}

const getShippingMethods = async (cartId?: string): Promise<ApolloQueryResult<ShippingMethodData>> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: { locale, cartId },
    fetchPolicy: 'no-cache'
  });
};

export default getShippingMethods;
