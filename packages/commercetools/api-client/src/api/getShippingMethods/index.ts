import { CustomQueryFn, getCustomQuery } from '../../index';
import defaultQuery from './defaultQuery';
import { ShippingMethod } from '../../types/GraphQL';
import gql from 'graphql-tag';
import { Config } from './../../types/setup';

interface ShippingMethodData {
  shippingMethods: ShippingMethod[];
}

const getShippingMethods = async (settings: Config, cartId?: string, customQueryFn?: CustomQueryFn) => {
  const { acceptLanguage, client } = settings;
  const defaultVariables = {
    acceptLanguage, cartId
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });
  return await client.query<ShippingMethodData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
};

export default getShippingMethods;
