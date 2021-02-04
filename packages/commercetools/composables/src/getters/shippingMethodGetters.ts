import { ShippingMethodGetters } from '@vue-storefront/core';
import { ShippingMethod } from './../types/GraphQL';
import { ShippingMethodData } from '@vue-storefront/commercetools-api/lib/api/getShippingMethods';

export const getMethods = (shippingMethods: ShippingMethodData) => shippingMethods.shippingMethods;
// How to figure out it?
export const getCurrentMethod = (shippingMethods: ShippingMethodData) => shippingMethods.shippingMethods[0];
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

const shippingMethodGetters: ShippingMethodGetters<ShippingMethodData, ShippingMethod> = {
  getMethods,
  getCurrentMethod,
  getMethodId,
  getMethodName,
  getMethodDescription,
  getMethodPrice,
  isMethodDefault
};

export default shippingMethodGetters;
