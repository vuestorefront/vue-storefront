import defaultQuery from './defaultQuery';
import { ShippingMethod } from '../../types/GraphQL';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';

export interface ShippingMethodData {
  shippingMethods: ShippingMethod[];
}

/**
 * @remarks References:
 * {@link ShippingMethodData}
 */
const getShippingMethods = async (context, cartId?: string, customQuery?: CustomQuery) => {
  const { acceptLanguage } = context.config;
  const defaultVariables = {
    acceptLanguage, cartId
  };

  const { shippingMethods } = context.extendQuery(
    customQuery, { shippingMethods: { query: defaultQuery, variables: defaultVariables } }
  );

  return await (context.client as ApolloClient<any>).query<ShippingMethodData>({
    query: gql`${shippingMethods.query}`,
    variables: shippingMethods.variables,
    fetchPolicy: 'no-cache'
  });
};

export default getShippingMethods;
