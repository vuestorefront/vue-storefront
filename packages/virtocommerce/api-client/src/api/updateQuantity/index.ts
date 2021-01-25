import {
  CartType,  
  LineItemType,
  UpdateCartItemQuantityMutation,
  UpdateCartItemQuantityMutationVariables,
} from '../../graphql/types';
import mutationDocument from './updateQuantityMutation';

const updateCartItemQuantity = async ({ config, client }, cart: CartType, lineItem: LineItemType,  qty: number): Promise<void> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.mutate({
    mutation: mutationDocument,
    variables: {
      command: {
        lineItemId: lineItem.id,
        quantity: qty,
        storeId: store,
        userId: getUserId(),
        currency: currency,
        language: locale,
      },
    }
  });
};

export default updateCartItemQuantity;
