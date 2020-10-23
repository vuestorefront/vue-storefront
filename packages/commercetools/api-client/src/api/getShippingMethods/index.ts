import { CustomQueryFn, getCustomQuery, getSettings } from '../../index';
import defaultQuery from './defaultQuery';
import { ShippingMethod } from '../../types/GraphQL';
import gql from 'graphql-tag';

interface ShippingMethodData {
  shippingMethods: ShippingMethod[];
}

const getShippingMethods = async (cartId?: string, customQueryFn?: CustomQueryFn) => {
  const { acceptLanguage, client } = getSettings();
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
