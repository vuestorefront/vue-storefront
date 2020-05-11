/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import { shippingDetails, loading } from './shared';
import initFields from './initFields';

const initialDetails = { contactInfo: {} };

const createSetShippingDetails = ({ factoryParams }) => async (data, options: any = {}) => {
  shippingDetails.value = { ...initialDetails, ...shippingDetails.value, ...data };

  if (!options.save) return;
  loading.value.shippingAddress = true;

  const cartResponse = await updateCart({
    id: cart.value.id,
    version: cart.value.version,
    actions: [
      cartActions.setShippingMethodAction(),
      cartActions.setShippingAddressAction(shippingDetails.value)
    ]
  });

  cart.value = cartResponse.data.cart;
  initFields(cart.value);
  loading.value.shippingAddress = false;
};

export default createSetShippingDetails;
