import { CartQueryResponse } from '../../types/Api';
import defaultQuery from './defaultQuery';

const getCart = async ({ config, client }, cartId: string): Promise<CartQueryResponse> => {
  const { locale, acceptLanguage } = config;
  return await client.query({
    query: defaultQuery,
    variables: { cartId,
      locale,
      acceptLanguage },
    fetchPolicy: 'no-cache'
  });
};

export default getCart;
