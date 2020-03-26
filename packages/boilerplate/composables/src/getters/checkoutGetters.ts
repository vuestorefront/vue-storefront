import { CheckoutGetters} from '@vue-storefront/interfaces';
import { ShippingMethod } from '@vue-storefront/boilerplate-api/src/types';

export const getShippingMethodId = (shippingMethod: ShippingMethod): string => '';

export const getShippingMethodName = (shippingMethod: ShippingMethod): string => '';

export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => '';

export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => 0;

const checkoutGetters: CheckoutGetters<ShippingMethod> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getShippingMethodPrice
};

export default checkoutGetters;
