/* eslint-disable @typescript-eslint/no-unused-vars */

import { getShippingMethods } from '@vue-storefront/commercetools-api';
import { shippingMethods, chosenShippingMethod, isShippingAddressCompleted, loading } from './shared';

const createLoadShippingMethods = ({ factoryParams, setShippingMethod, cartFields }) => async () => {
  if (!isShippingAddressCompleted.value) return;
  loading.value.shippingMethods = true;

  const shippingMethodsResponse = await getShippingMethods(cartFields.cart.value.id);
  shippingMethods.value = shippingMethodsResponse.data.shippingMethods;
  const defaultShipping = shippingMethods.value.find(method => method.isDefault) || shippingMethods.value[0];
  const { shippingInfo } = cartFields.cart.value;

  if (!shippingInfo && defaultShipping) {
    await setShippingMethod(defaultShipping, { save: true });
  }

  chosenShippingMethod.value = shippingInfo?.shippingMethod || defaultShipping || {};
  loading.value.shippingMethods = false;
};

export default createLoadShippingMethods;
