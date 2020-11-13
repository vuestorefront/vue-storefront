import { xApiClient, getSettings } from '../../index';
import {
  AddOrUpdateCartPaymentMutation,
  AddOrUpdateCartPaymentMutationVariables,
  CartType,
  InputPaymentType
} from '../../graphql/types';
import mutationDocument from './addOrUpdateCartPaymentMutation';

const addOrUpdateCartPayment = async (cart: CartType, payment: InputPaymentType): Promise<void> => {
  const { store, userId, currency, locale } = getSettings();
  const { data } = await xApiClient.mutate<AddOrUpdateCartPaymentMutation, AddOrUpdateCartPaymentMutationVariables>({
    mutation: mutationDocument,
    variables: {
      command: {
        payment: payment,
        storeId: store,
        userId: userId,
        currency: currency,
        language: locale,
      },
    }
  });
};

export default addOrUpdateCartPayment;
