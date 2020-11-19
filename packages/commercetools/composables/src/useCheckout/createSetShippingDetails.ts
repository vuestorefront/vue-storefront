/* eslint-disable @typescript-eslint/no-unused-vars */

import { cartActions } from '@vue-storefront/commercetools-api';
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const initialDetails = { contactInfo: {} };

const createSetShippingDetails = (params) => async (data, options: any = {}, customQuery?: CustomQuery) => {
  const { cartFields, setCart, shippingDetails, loading, context } = params;
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

  try {
    const cartResponse = await context.$api.updateCart({
      id: cartFields.cart.value.id,
      version: cartFields.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(),
        cartActions.setShippingAddressAction(shippingDetails.value)
      ]
    }, customQuery);

    setCart(cartResponse.data.cart);
    initFields(cartResponse.data.cart, params);
  } finally {
    loading.value.shippingAddress = false;
  }
};

export default createSetShippingDetails;
