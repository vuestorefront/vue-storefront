import { CustomQuery } from '@vue-storefront/core';
import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart, ReferenceInput } from '../../types/GraphQL';
import { removeDiscountCodeAction } from '../../helpers/cart/actions';

const removeCartCoupon = async (
  context,
  cart: Cart,
  discountCode: ReferenceInput,
  customQuery?: CustomQuery
): Promise<CartResponse> => {
  return await updateCart(context, {
    id: cart.id,
    version: cart.version,
    actions: [removeDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default removeCartCoupon;
