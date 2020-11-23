/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomQuery } from '@vue-storefront/core';

const createLoadShippingMethods = ({ context, cartFields, shippingMethods, isShippingAddressCompleted, loading }, customQuery?: CustomQuery) => async () => {
  if (!isShippingAddressCompleted.value) return;
  loading.value.shippingMethods = true;

  try {
    const shippingMethodsResponse = await context.$ct.api.getShippingMethods(cartFields.cart.value.id, customQuery);
    shippingMethods.value = shippingMethodsResponse.data.shippingMethods;
  } finally {
    loading.value.shippingMethods = false;
  }
};

export default createLoadShippingMethods;
