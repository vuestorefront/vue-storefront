/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { shippingDetails, loading } from './shared';
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const initialDetails = { contactInfo: {} };

const createSetShippingDetails = ({ factoryParams, cartFields, setCart }) => async (data, options: any = {}, customQuery?: CustomQuery) => {
  shippingDetails.value = {
    ...initialDetails,
    ...shippingDetails.value,
    ...data,
    contactInfo: {
      ...initialDetails.contactInfo,
      ...shippingDetails.value.contactInfo,
      ...data.contactInfo
    }
  };

  if (!options.save) {
    return;
  }

  loading.value.shippingAddress = true;

  const cartResponse = await updateCart({
    id: cartFields.cart.value.id,
    version: cartFields.cart.value.version,
    actions: [
      cartActions.setShippingMethodAction(),
      cartActions.setShippingAddressAction(shippingDetails.value)
    ]
  }, customQuery);

  setCart(cartResponse.data.cart);
  initFields(cartResponse.data.cart);
  loading.value.shippingAddress = false;
};

export default createSetShippingDetails;
