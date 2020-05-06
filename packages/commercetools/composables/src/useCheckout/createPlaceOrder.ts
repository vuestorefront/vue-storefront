/* eslint-disable @typescript-eslint/no-unused-vars */

import { createMyOrderFromCart, createCart } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';

const createPlaceOrder = (factoryParams) => async () => {
  const { id, version } = cart.value;

  await createMyOrderFromCart({ id, version });
  const cartResponse = await createCart();
  cart.value = cartResponse.data.cart;
};

export default createPlaceOrder;
