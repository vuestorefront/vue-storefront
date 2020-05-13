/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { shippingDetails, loading } from './shared';
import initFields from './initFields';

const initialDetails = { contactInfo: {} };

const createSetShippingDetails = ({ factoryParams, cartFields, setCart }) => async (data, options: any = {}) => {
  shippingDetails.value = { ...initialDetails, ...shippingDetails.value, ...data };

  if (!options.save) return;
  loading.value.shippingAddress = true;

  const cartResponse = await updateCart({
    id: cartFields.cart.value.id,
    version: cartFields.cart.value.version,
    actions: [
      cartActions.setShippingMethodAction(),
      cartActions.setShippingAddressAction(shippingDetails.value)
    ]
  });

  setCart(cartResponse.data.cart);
  initFields(cartFields.cart.value);
  loading.value.shippingAddress = false;
};

export default createSetShippingDetails;
