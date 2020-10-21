/* eslint-disable @typescript-eslint/no-unused-vars */

import { createMyOrderFromCart } from '@vue-storefront/commercetools-api';
import { loading } from './shared';
import { CustomQuery } from '@vue-storefront/core';

const createPlaceOrder = ({ cartFields }, customQuery: CustomQuery) => async () => {
  loading.value.order = true;
  const { id, version } = cartFields.cart.value;

  const orderResponse = await createMyOrderFromCart({ id, version }, customQuery);
  const { order } = orderResponse.data;

  loading.value.order = false;
  return order;
};

export default createPlaceOrder;
