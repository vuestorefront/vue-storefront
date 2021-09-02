import { Cart } from './../../types/GraphQL';
import { AgnosticCoupon } from '@vue-storefront/core';

export default (cart: Cart): AgnosticCoupon[] => {
  const coupons = cart?.discountCodes;
  if (!coupons) {
    return;
  }
  return coupons.map(coupon => ({
    id: coupon.discountCode.id,
    name: coupon.discountCode.name,
    code: coupon.discountCode.code,
    value: null
  }));
};
