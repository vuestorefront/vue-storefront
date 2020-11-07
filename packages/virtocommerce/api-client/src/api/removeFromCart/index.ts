import { xApiClient, getSettings } from '../../index';
import {
  CartType,
  LineItemType,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables,
} from '../../graphql/types';
import mutationDocument from './removeFromCartMutation';

const removeFromCart = async (cart: CartType, lineItem: LineItemType): Promise<void> => {
  const { store, userId, currency, locale } = getSettings();
  const { data } = await xApiClient.mutate<RemoveFromCartMutation, RemoveFromCartMutationVariables>({
    mutation: mutationDocument,
    variables: {
      command: {
        lineItemId: lineItem.id,
        storeId: store,
        userId: userId,
        currency: currency,
        language: locale,
      },
    }
  });
};

export default removeFromCart;
