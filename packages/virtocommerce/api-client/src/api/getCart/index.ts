import {
  CartType,
  GetCartQuery,
  GetCartQueryVariables,  
} from '../../graphql/types';
import queryDocument from './getCartQuery';

const getCart = async ({ config, client }): Promise<CartType> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.query({
    query: queryDocument,
    variables: {
      storeId: store,
      userId: getUserId(),
      currencyCode: currency,
      cultureName: locale
    },
    fetchPolicy: "no-cache"
  });
  return data.cart;
};

export default getCart;

