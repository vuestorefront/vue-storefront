import { CustomQueryFn, getCustomQuery } from '../../index';
import defaultQuery from './defaultQuery';
import { ShippingMethod } from '../../types/GraphQL';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { apiClientMethodFactory } from './../../configuration';

interface ShippingMethodData {
  shippingMethods: ShippingMethod[];
}

async function getShippingMethods(cartId?: string, customQueryFn?: CustomQueryFn) {
  const { acceptLanguage, client } = this.$vsf.ct;
  const defaultVariables = {
    acceptLanguage, cartId
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });
  return await (client as ApolloClient<any>).query<ShippingMethodData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
}

export default apiClientMethodFactory(getShippingMethods);
