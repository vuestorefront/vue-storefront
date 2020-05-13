/* eslint-disable @typescript-eslint/no-unused-vars */

import { updateCart, cartActions } from '@vue-storefront/commercetools-api';
import { chosenShippingMethod, loading } from './shared';
import initFields from './initFields';

const setShippingMethod = ({ factoryParams, cartFields, setCart }) => async (method, options: any = {}) => {
  chosenShippingMethod.value = method;

  if (!options.save) return;
  loading.value.shippingMethod = true;

  const cartResponse = await updateCart({
    id: cartFields.cart.value.id,
    version: cartFields.cart.value.version,
    actions: [
      cartActions.setShippingMethodAction(method.id)
    ]
  });

  setCart(cartResponse.data.cart);
  initFields(cartFields.cart.value);
  loading.value.shippingMethod = false;
};

export default setShippingMethod;
