/* eslint-disable @typescript-eslint/no-unused-vars */

import { createMyOrderFromCart, createCart } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import initFields from './initFields';

const createPlaceOrder = (factoryParams) => async () => {
  const { id, version } = cart.value;

  const orderResponse = await createMyOrderFromCart({ id, version });
  const cartResponse = await createCart();
  cart.value = cartResponse.data.cart;
  initFields(cart.value);

  return orderResponse.data.order;
};

export default createPlaceOrder;
