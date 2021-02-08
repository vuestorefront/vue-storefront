import { ShippingMethodGetters } from '@vue-storefront/core';
import { ShippingMethod } from './../types/GraphQL';
import { ShippingMethodData } from '@vue-storefront/commercetools-api/lib/api/getShippingMethods';

export const getMethods = (shippingMethods: ShippingMethodData, criteria?: Record<string, any>) => {
  const methods = shippingMethods.shippingMethods;
  if (!criteria || !Object.keys(criteria).length) {
    return methods;
  }

  const entries = Object.entries(criteria);
  return methods.filter(address => entries.every(([key, value]) => address[key] === value));
};
// How to figure out it?
export const getCurrentMethod = (shippingMethods: ShippingMethodData) => shippingMethods.shippingMethods[0];
export const getMethodId = (method: ShippingMethod) => method?.id || '';
export const getMethodName = (method: ShippingMethod) => method?.name || '';
export const getMethodDescription = (method: ShippingMethod) => method?.description || '';
export const getMethodPrice = (method: ShippingMethod): number => {
  if (!method || !method.zoneRates) {
    return null;
  }

  return method.zoneRates[0].shippingRates[0].price.centAmount / 100;
};
export const isMethodDefault = (method: ShippingMethod) => method?.isDefault || false;

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
