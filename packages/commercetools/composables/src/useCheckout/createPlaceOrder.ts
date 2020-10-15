/* eslint-disable @typescript-eslint/no-unused-vars */

import { createMyOrderFromCart, deleteCart } from '@vue-storefront/commercetools-api';
import initFields from './initFields';
import { loading } from './shared';

const createPlaceOrder = ({ factoryParams, cartFields, setCart }) => async () => {
  loading.value.order = true;
  const { id, version } = cartFields.cart.value;

  const orderResponse = await createMyOrderFromCart({ id, version });
  const { order } = orderResponse.data;

  const cartResponse = await deleteCart(order.cart.id, order.cart.version);
  setCart(null);

  loading.value.order = false;
  return order;
};

export default createPlaceOrder;
