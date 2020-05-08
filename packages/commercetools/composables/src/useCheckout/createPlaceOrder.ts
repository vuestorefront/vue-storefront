/* eslint-disable @typescript-eslint/no-unused-vars */

import { createMyOrderFromCart, createCart } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import initFields from './initFields';
import { loading } from './shared';

const createPlaceOrder = ({ factoryParams }) => async () => {
  loading.value.order = true;
  const { id, version } = cart.value;

  const orderResponse = await createMyOrderFromCart({ id, version });
  const cartResponse = await createCart();
  cart.value = cartResponse.data.cart;
  initFields(cart.value);

  loading.value.order = false;
  return orderResponse.data.order;
};

export default createPlaceOrder;
