import { Cart } from './../../types/GraphQL';
import { AgnosticCoupon } from '@vue-storefront/core';

export default (cart: Cart): AgnosticCoupon => {
  const coupon = cart?.discountCodes[0];
  if (!coupon) {
    return;
  }
  return {
    id: coupon.discountCode.id,
    name: coupon.discountCode.name,
    code: coupon.discountCode.code,
    value: null
  };
};
