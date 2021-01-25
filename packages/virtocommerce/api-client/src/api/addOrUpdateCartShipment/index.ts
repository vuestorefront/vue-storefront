import {
  AddOrUpdateCartShpmentMutation,
  AddOrUpdateCartShpmentMutationVariables,
  CartType,
  InputShipmentType
} from '../../graphql/types';
import mutationDocument from './addOrUpdateCartShipmentMutation';

const addOrUpdateCartShipment = async ({ config, client }, cart: CartType, shipment: InputShipmentType): Promise<void> => {
  const { store, getUserId, currency, locale } = config;
  const { data } = await client.mutate({
    mutation: mutationDocument,
    variables: {
      command: {
        shipment: shipment,
        storeId: store,
        userId: getUserId(),
        currency: currency,
        language: locale,
      },
    }
  });
};

export default addOrUpdateCartShipment;
