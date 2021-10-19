import { CartQueryResponse } from '../../types/Api';
import defaultQuery from './defaultQuery';

/**
 * @remarks References:
 * {@link CartQueryResponse}
 */
const getCart = async ({ config, client }, cartId: string): Promise<CartQueryResponse> => {
  const { locale, acceptLanguage, currency } = config;

  return await client.query({
    query: defaultQuery,
    variables: { cartId, locale, acceptLanguage, currency },
    fetchPolicy: 'no-cache'
  });
};

export default getCart;
