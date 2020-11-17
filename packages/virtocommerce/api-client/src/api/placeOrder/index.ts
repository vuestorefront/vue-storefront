import { xApiClient, getSettings } from '../../index';
import {
  PlaceOrderMutation,
  PlaceOrderMutationVariables,
  CustomerOrderType,
  CartType
} from '../../graphql/types';
import mutationDocument from './placeOrderMutation';

const placeOrder = async (cart: CartType): Promise<any> => {
  const { store, getUserId, currency, locale } = getSettings();
  const { data } = await xApiClient.mutate<PlaceOrderMutation, PlaceOrderMutationVariables>({
    mutation: mutationDocument,
    variables: {
      command: {
        cartId: cart.id,
      },
    }
  });
return data?.createOrderFromCart;
};

export default placeOrder;
