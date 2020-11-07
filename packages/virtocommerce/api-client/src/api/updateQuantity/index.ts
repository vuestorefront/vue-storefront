import { xApiClient, getSettings } from '../../index';
import {
  CartType,  
  LineItemType,
  UpdateCartItemQuantityMutation,
  UpdateCartItemQuantityMutationVariables,
} from '../../graphql/types';
import mutationDocument from './updateQuantityMutation';

const updateCartItemQuantity = async (cart: CartType, lineItem: LineItemType,  qty: number): Promise<void> => {
  const { store, userId, currency, locale } = getSettings();
  const { data } = await xApiClient.mutate<UpdateCartItemQuantityMutation, UpdateCartItemQuantityMutationVariables>({
    mutation: mutationDocument,
    variables: {
      command: {
        lineItemId: lineItem.id,
        quantity: qty,
        storeId: store,
        userId: userId,
        currency: currency,
        language: locale,
      },
    }
  });
};

export default updateCartItemQuantity;
