import { xApiClient, getSettings } from '../../index';
import {
  AddOrUpdateCartShpmentMutation,
  AddOrUpdateCartShpmentMutationVariables,
  CartType,
  InputShipmentType
} from '../../graphql/types';
import mutationDocument from './addOrUpdateCartShipmentMutation';

const addOrUpdateCartShipment = async (cart: CartType, shipment: InputShipmentType): Promise<void> => {
  const { store, getUserId, currency, locale } = getSettings();
  const { data } = await xApiClient.mutate<AddOrUpdateCartShpmentMutation, AddOrUpdateCartShpmentMutationVariables>({
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
