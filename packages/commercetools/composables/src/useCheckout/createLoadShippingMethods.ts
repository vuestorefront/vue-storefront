/* eslint-disable @typescript-eslint/no-unused-vars */

import { getShippingMethods } from '@vue-storefront/commercetools-api';
import { shippingMethods, isShippingAddressCompleted, loading } from './shared';
import { CustomQuery } from '@vue-storefront/core';

const createLoadShippingMethods = ({ context, cartFields }, customQuery?: CustomQuery) => async () => {
  if (!isShippingAddressCompleted.value) return;
  loading.value.shippingMethods = true;

  try {
    const shippingMethodsResponse = await getShippingMethods.raw.bind(context)(cartFields.cart.value.id, customQuery);
    shippingMethods.value = shippingMethodsResponse.data.shippingMethods;
  } finally {
    loading.value.shippingMethods = false;
  }
};

export default createLoadShippingMethods;
