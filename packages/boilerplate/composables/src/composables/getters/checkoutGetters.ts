import { CheckoutGetters} from '@vue-storefront/core';
import { ShippingMethod } from '@vue-storefront/boilerplate-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodId = (shippingMethod: ShippingMethod): string => shippingMethod ? shippingMethod.id : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodName = (shippingMethod: ShippingMethod): string => shippingMethod ? shippingMethod.name : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => shippingMethod ? shippingMethod.description : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => shippingMethod ? shippingMethod.price : 0;

export const getFormattedPrice = (price: number) => String(price);

const checkoutGetters: CheckoutGetters<ShippingMethod> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};

export default checkoutGetters;
