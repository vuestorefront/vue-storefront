/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { cart } from './../useCart';
import { chosenShippingMethod, loading } from './shared';
import initFields from './initFields';

const setShippingMethod = ({ factoryParams }) => async (method, options: any = {}) => {
  chosenShippingMethod.value = method;

  if (!options.save) return;
  loading.value.shippingMethod = true;

  const cartResponse = await updateCart({
    id: cart.value.id,
    version: cart.value.version,
    actions: [
      cartActions.setShippingMethodAction(method.id)
    ]
  });

  cart.value = cartResponse.data.cart;
  initFields(cart.value);
  loading.value.shippingMethod = false;
};

export default setShippingMethod;
