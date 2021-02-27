import { CheckoutGetters } from '@vue-storefront/core';
import { ShippingMethod } from '@vue-storefront/boilerplate-api/src/types';
export declare const getShippingMethodId: (shippingMethod: ShippingMethod) => string;
export declare const getShippingMethodName: (shippingMethod: ShippingMethod) => string;
export declare const getShippingMethodDescription: (shippingMethod: ShippingMethod) => string;
export declare const getShippingMethodPrice: (shippingMethod: ShippingMethod) => number;
export declare const getFormattedPrice: (price: number) => string;
declare const checkoutGetters: CheckoutGetters<ShippingMethod>;
export default checkoutGetters;
