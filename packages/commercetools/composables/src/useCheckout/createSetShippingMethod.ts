/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { chosenShippingMethod, loading } from './shared';
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const setShippingMethod = ({ factoryParams, cartFields, setCart }) => async (method, options: any = {}, customQuery?: CustomQuery) => {
  chosenShippingMethod.value = method;

  if (!options.save) return;
  loading.value.shippingMethod = true;

  const cartResponse = await updateCart({
    id: cartFields.cart.value.id,
    version: cartFields.cart.value.version,
    actions: [
      cartActions.setShippingMethodAction(method.id)
    ]
  }, customQuery);

  setCart(cartResponse.data.cart);
  initFields(cartResponse.data.cart);
  loading.value.shippingMethod = false;
};

export default setShippingMethod;
