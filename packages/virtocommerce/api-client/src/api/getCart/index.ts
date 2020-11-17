import { xApiClient, getSettings } from '../../index';
import {
  CartType,
  GetCartQuery,
  GetCartQueryVariables,  
} from '../../graphql/types';
import queryDocument from './getCartQuery';

const getCart = async (): Promise<CartType> => {
  const { store, getUserId, currency, locale } = getSettings();
  const { data } = await xApiClient.query<GetCartQuery, GetCartQueryVariables>({
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

