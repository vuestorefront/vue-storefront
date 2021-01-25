import {
  AddOrUpdateCartPaymentMutation,
  AddOrUpdateCartPaymentMutationVariables,
  CartType,
  InputPaymentType
} from '../../graphql/types';
import mutationDocument from './addOrUpdateCartPaymentMutation';

const addOrUpdateCartPayment = async ({ config, client }, cart: CartType, payment: InputPaymentType): Promise<void> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.mutate({
    mutation: mutationDocument,
    variables: {
      command: {
        payment: payment,
        storeId: store,
        userId: getUserId(),
        currency: currency,
        language: locale,
      }
    }
  });
};

export default addOrUpdateCartPayment;
