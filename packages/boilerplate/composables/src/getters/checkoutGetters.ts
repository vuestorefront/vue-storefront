import { CheckoutGetters } from '@vue-storefront/core';
import type { ShippingMethod } from '@vue-storefront/boilerplate-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingMethodId(method: ShippingMethod): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingMethodName(method: ShippingMethod): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingMethodDescription(method: ShippingMethod): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingMethodPrice(method: ShippingMethod): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

export const checkoutGetters: CheckoutGetters<ShippingMethod> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};
