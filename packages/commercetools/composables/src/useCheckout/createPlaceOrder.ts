/* eslint-disable @typescript-eslint/no-unused-vars */

import { createMyOrderFromCart, createCart } from '@vue-storefront/commercetools-api';
import initFields from './initFields';
import { loading } from './shared';

const createPlaceOrder = ({ factoryParams, cartFields, setCart }) => async () => {
  loading.value.order = true;
  const { id, version } = cartFields.cart.value;

  const orderResponse = await createMyOrderFromCart({ id, version });
  const cartResponse = await createCart();
  setCart(cartResponse.data.cart);
  initFields(cartResponse.data.cart);

  loading.value.order = false;
  return orderResponse.data.order;
};

export default createPlaceOrder;
