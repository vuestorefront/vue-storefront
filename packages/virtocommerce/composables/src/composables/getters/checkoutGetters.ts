import { CheckoutGetters} from '@vue-storefront/core';
import { ShippingMethodType } from '@vue-storefront/virtocommerce-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodId = (shippingMethod: ShippingMethodType): string => `${shippingMethod.code}:${shippingMethod.optionName}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodName = (shippingMethod: ShippingMethodType): string => `${shippingMethod.code}(${shippingMethod.optionName})`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodDescription = (shippingMethod: ShippingMethodType): string =>`${shippingMethod.code}(${shippingMethod.optionName})`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getShippingMethodPrice = (shippingMethod: ShippingMethodType): number => shippingMethod.price?.amount || 0;

export const getFormattedPrice = (price: number) => String(price);

const checkoutGetters: CheckoutGetters<ShippingMethodType> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};

export default checkoutGetters;
