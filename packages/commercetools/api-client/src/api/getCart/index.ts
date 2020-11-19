import { CartQueryResponse } from '../../types/Api';
import defaultQuery from './defaultQuery';
import { Config } from './../../types/setup';

const getCart = async (settings: Config, cartId: string): Promise<CartQueryResponse> => {
  const { locale, acceptLanguage, client } = settings;
  return await client.query({
    query: defaultQuery,
    variables: { cartId,
      locale,
      acceptLanguage },
    fetchPolicy: 'no-cache'
  });
};

export default getCart;
