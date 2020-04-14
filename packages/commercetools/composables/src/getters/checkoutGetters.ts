import { CheckoutGetters} from '@vue-storefront/core';
import { ShippingMethod } from './../types/GraphQL';

export const getShippingMethodId = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.id : '';

export const getShippingMethodName = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.name : '';

export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.description : '';

export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => {
  if (!shippingMethod || !shippingMethod.zoneRates) {
    return null;
  }

  return shippingMethod.zoneRates[0].shippingRates[0].price.centAmount / 100;
};

const checkoutGetters: CheckoutGetters<ShippingMethod> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getShippingMethodPrice
};

export default checkoutGetters;
