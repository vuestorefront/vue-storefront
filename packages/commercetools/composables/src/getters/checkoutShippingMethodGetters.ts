import { CheckoutShippingMethodGetters } from '@vue-storefront/core';
import { ShippingMethod } from './../types/GraphQL';
import { ShippingMethodData } from '@vue-storefront/commercetools-api/lib/api/getShippingMethods';

export const getShippingMethods = (shippingMethods: ShippingMethodData) => shippingMethods.shippingMethods;
export const getMethodId = (method: ShippingMethod) => method?.id;
export const getMethodName = (method: ShippingMethod) => method.name;
export const getMethodDescription = (method: ShippingMethod) => method.description;
export const getMethodPrice = (method: ShippingMethod): number => {
  if (!method || !method.zoneRates) {
    return null;
  }

  return method.zoneRates[0].shippingRates[0].price.centAmount / 100;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isMethodDefault = (method: ShippingMethod) => false;

const checkoutShippingMethodGetters: CheckoutShippingMethodGetters<ShippingMethodData, ShippingMethod> = {
  getShippingMethods,
  getMethodId,
  getMethodName,
  getMethodDescription,
  getMethodPrice,
  isMethodDefault
};

export default checkoutShippingMethodGetters;
