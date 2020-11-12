import { CartQueryResponse } from '../../types/Api';
import defaultQuery from './defaultQuery';

const getCart = async ({ $vsfSettings }, cartId: string): Promise<CartQueryResponse> => {
  const { locale, acceptLanguage, client } = $vsfSettings;
  return await client.query({
    query: defaultQuery,
    variables: { cartId,
      locale,
      acceptLanguage },
    fetchPolicy: 'no-cache'
  });
};

export default getCart;
