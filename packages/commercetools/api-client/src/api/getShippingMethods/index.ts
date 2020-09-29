import { apolloClient, getSettings } from '../../index';
import defaultQuery from './defaultQuery';
import { ShippingMethod } from './../../types/GraphQL';

interface ShippingMethodData {
  shippingMethods: ShippingMethod[];
}

const getShippingMethods = async (cartId?: string) => {
  const { acceptLanguage } = getSettings();
  return await apolloClient.query<ShippingMethodData>({
    query: defaultQuery,
    variables: { acceptLanguage, cartId },
    fetchPolicy: 'no-cache'
  });
};

export default getShippingMethods;
