import { CheckoutShippingMethodGetters } from '@vue-storefront/core';
import { createPrice } from './_utils';

export const getShippingMethods = (methods: any) => methods;
export const getMethodName = (method: any) => method.name;
export const getMethodDescription = (method: any) => method.description;
export const getMethodPrice = (method: any) => {
  const matchingShippingRate = method.zoneRates[0].shippingRates.find(shippingRate => shippingRate.isMatching);
  if (!matchingShippingRate) {
    return null;
  }
  return createPrice(matchingShippingRate);
};
export const isMethodDefault = (method: any) => method.firstName;

const checkoutShippingMethodGetters: CheckoutShippingMethodGetters<any, any> = {
  getShippingMethods,
  getMethodName,
  getMethodDescription,
  getMethodPrice,
  isMethodDefault
};

export default checkoutShippingMethodGetters;
