import { CartQueryResponse } from '../../types/Api';
import defaultQuery from './defaultQuery';
import { apiClientMethodFactory } from './../../configuration';

async function getCart(cartId: string): Promise<CartQueryResponse> {
  const { locale, acceptLanguage, client } = this.$vsf.ct;
  return await client.query({
    query: defaultQuery,
    variables: { cartId,
      locale,
      acceptLanguage },
    fetchPolicy: 'no-cache'
  });
}

export default apiClientMethodFactory(getCart);
