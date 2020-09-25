import { apolloClient, getSettings } from './../../index';
import { CartQueryResponse } from './../../types/Api';
import defaultQuery from './defaultQuery';

const getCart = async (cartId: string): Promise<CartQueryResponse> => {
  const { locale, acceptLanguage } = getSettings();
  return await apolloClient.query({
    query: defaultQuery,
    variables: { cartId,
      locale,
      acceptLanguage },
    fetchPolicy: 'no-cache'
  });
};

export default getCart;
