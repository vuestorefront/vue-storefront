import {
  CartType,
  LineItemType,
  RemoveFromCartMutation,
  RemoveFromCartMutationVariables,
} from '../../graphql/types';
import mutationDocument from './removeFromCartMutation';

const removeFromCart = async ({ config, client }, cart: CartType, lineItem: LineItemType): Promise<void> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.mutate({
    mutation: mutationDocument,
    variables: {
      command: {
        lineItemId: lineItem.id,
        storeId: store,
        userId: getUserId(),
        currency: currency,
        language: locale,
      },
    }
  });
};

export default removeFromCart;
