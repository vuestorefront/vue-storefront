import { CustomQuery } from '@vue-storefront/core';
import updateCart from '../updateCart';
import { CartDetails, CartResponse } from '../../types/Api';
import { ReferenceInput } from '../../types/GraphQL';
import { removeDiscountCodeAction } from '../../helpers/cart/actions';

/**
 * @remarks References:
 * {@link CartDetails}, {@link ReferenceInput}, {@link CartResponse}
 */
const removeCartCoupon = async (
  context,
  { id, version }: CartDetails,
  discountCode: ReferenceInput,
  customQuery?: CustomQuery
): Promise<CartResponse> => {
  return await updateCart(context, {
    id,
    version,
    actions: [removeDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default removeCartCoupon;
