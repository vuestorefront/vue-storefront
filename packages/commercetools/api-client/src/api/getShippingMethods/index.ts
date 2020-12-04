import { CustomQueryFn, getCustomQuery } from '../../index';
import defaultQuery from './defaultQuery';
import { ShippingMethod } from '../../types/GraphQL';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';

interface ShippingMethodData {
  shippingMethods: ShippingMethod[];
}

const getShippingMethods = async ({ config, client }, cartId?: string, customQueryFn?: CustomQueryFn) => {
  const { acceptLanguage } = config;
  const defaultVariables = {
    acceptLanguage, cartId
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });
  return await (client as ApolloClient<any>).query<ShippingMethodData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
};

export default getShippingMethods;
