import { xApiClient, getSettings } from '../../index';
import {
  CartType, 
  ClearCartMutation,
  ClearCartMutationVariables,
} from '../../graphql/types';
import mutationDocument from './clearCartMutation';

const clearCart = async (cart: CartType): Promise<void> => {
  const { store, userId, currency, locale } = getSettings();
  const { data } = await xApiClient.mutate<ClearCartMutation, ClearCartMutationVariables>({
    mutation: mutationDocument,
    variables: {
      command: {
        storeId: store,
        userId: userId,
        currency: currency,
        language: locale,
      },
    }
  });  
};

export default clearCart;
