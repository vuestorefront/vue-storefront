import {
  CartType, 
  ClearCartMutation,
  ClearCartMutationVariables,
} from '../../graphql/types';
import mutationDocument from './clearCartMutation';

const clearCart = async ({ config, client }, cart: CartType): Promise<void> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.mutate({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId: store,
        userId: getUserId(),
        currency: currency,
        language: locale,
      },
    }
  });  
};

export default clearCart;
