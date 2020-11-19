/* eslint-disable @typescript-eslint/no-unused-vars */

import { cartActions } from '@vue-storefront/commercetools-api';
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const initialDetails = { contactInfo: {} };

const createSetBillingDetails = (params) => async (data, options: any = {}, customQuery?: CustomQuery) => {
  const { cartFields, setCart, billingDetails, loading, context } = params;
  billingDetails.value = {
    ...initialDetails,
    ...billingDetails.value,
    ...data,
    contactInfo: {
      ...initialDetails.contactInfo,
      ...billingDetails.value.contactInfo,
      ...data.contactInfo
    }
  };

  if (!options.save) return;
  loading.value.billingAddress = true;

  try {
    const cartResponse = await context.$api.updateCart({
      id: cartFields.cart.value.id,
      version: cartFields.cart.value.version,
      actions: [
        cartActions.setBillingAddressAction(billingDetails.value)
      ]
    }, customQuery);

    setCart(cartResponse.data.cart);
    initFields(cartResponse.data.cart, params);
  } finally {
    loading.value.billingAddress = false;
  }
};

export default createSetBillingDetails;
