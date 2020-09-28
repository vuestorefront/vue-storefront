import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart, ReferenceInput } from '../../types/GraphQL';
import { removeDiscountCodeAction } from '../../helpers/cart/actions';
import { CustomQueryFn } from '@vue-storefront/core';

const removeCartCoupon = async (
  cart: Cart,
  discountCode: ReferenceInput,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [removeDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default removeCartCoupon;
