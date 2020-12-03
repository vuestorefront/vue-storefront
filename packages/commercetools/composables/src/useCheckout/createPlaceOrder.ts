/* eslint-disable @typescript-eslint/no-unused-vars */

import { CustomQuery } from '@vue-storefront/core';

const createPlaceOrder = ({ context, cartFields, loading }, customQuery?: CustomQuery) => async () => {
  loading.value.order = true;
  const { id, version } = cartFields.cart.value;

  try {
    const orderResponse = await context.$ct.api.createMyOrderFromCart({ id, version }, customQuery);
    const { order } = orderResponse.data;
    return order;
  } finally {
    loading.value.order = false;
  }
};

export default createPlaceOrder;
