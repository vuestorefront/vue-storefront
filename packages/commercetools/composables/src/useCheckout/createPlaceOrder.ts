/* eslint-disable @typescript-eslint/no-unused-vars */

import { createMyOrderFromCart } from '@vue-storefront/commercetools-api';
import { loading } from './shared';
import { CustomQuery } from '@vue-storefront/core';

const createPlaceOrder = ({ context, cartFields }, customQuery?: CustomQuery) => async () => {
  loading.value.order = true;
  const { id, version } = cartFields.cart.value;

  try {
    const orderResponse = await createMyOrderFromCart.raw.bind(context)({ id, version }, customQuery);
    const { order } = orderResponse.data;
    return order;
  } finally {
    loading.value.order = false;
  }
};

export default createPlaceOrder;
