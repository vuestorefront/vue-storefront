import defaultQuery from './defaultQuery';
import { ShippingMethod } from '../../types/GraphQL';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';

export interface ShippingMethodData {
  shippingMethods: ShippingMethod[];
}

const getShippingMethods = async (context, cartId?: string) => {
  const { acceptLanguage } = context.config;
  const defaultVariables = {
    acceptLanguage, cartId
  };

  const { shippingMethods } = context.createQuery({ shippingMethods: { query: defaultQuery, variables: defaultVariables } });

  return await (context.client as ApolloClient<any>).query<ShippingMethodData>({
    query: gql`${shippingMethods.query}`,
    variables: shippingMethods.variables,
    fetchPolicy: 'no-cache'
  });
};

export default getShippingMethods;
