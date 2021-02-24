import { CheckoutGetters} from '@vue-storefront/core';
import { ShippingMethod } from '@vue-storefront/boilerplate-api';

export const getShippingMethodId = (shippingMethod: ShippingMethod): string => shippingMethod.id;

export const getShippingMethodName = (shippingMethod: ShippingMethod): string => shippingMethod.name;

export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => shippingMethod.description;

export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => shippingMethod.price;

export const getFormattedPrice = (price: number) => String(price);

const checkoutGetters: CheckoutGetters<ShippingMethod> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};

export default checkoutGetters;
