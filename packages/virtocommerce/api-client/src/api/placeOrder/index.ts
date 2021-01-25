import {
  PlaceOrderMutation,
  PlaceOrderMutationVariables,
  CustomerOrderType,
  CartType
} from '../../graphql/types';
import mutationDocument from './placeOrderMutation';

const placeOrder = async ({ config, client }, cart: CartType): Promise<any> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.mutate({
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
