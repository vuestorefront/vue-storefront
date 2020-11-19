/* eslint-disable @typescript-eslint/no-unused-vars */

import { cartActions } from '@vue-storefront/commercetools-api';
import initFields from './initFields';
import { CustomQuery } from '@vue-storefront/core';

const setShippingMethod = (params) => async (method, options: any = {}, customQuery?: CustomQuery) => {
  const { chosenShippingMethod, loading, context, cartFields, setCart } = params;
  chosenShippingMethod.value = method;

  if (!options.save) return;
  loading.value.shippingMethod = true;

  try {
    const cartResponse = await context.$api.updateCart({
      id: cartFields.cart.value.id,
      version: cartFields.cart.value.version,
      actions: [
        cartActions.setShippingMethodAction(method.id)
      ]
    }, customQuery);

    setCart(cartResponse.data.cart);
    initFields(cartResponse.data.cart, params);
  } finally {
    loading.value.shippingMethod = false;
  }
};

export default setShippingMethod;
