import { CustomQuery } from '@vue-storefront/core';
import updateCart from '../updateCart';
import { CartDetails, CartResponse } from '../../types/Api';
import { addDiscountCodeAction } from '../../helpers/cart/actions';

/**
 * @remarks References:
 * {@link CartDetails}, {@link CartResponse}
 */
const applyCartCoupon = async (
  settings,
  { id, version }: CartDetails,
  discountCode: string,
  customQuery?: CustomQuery
): Promise<CartResponse> => {
  return await updateCart(settings, {
    id,
    version,
    actions: [addDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default applyCartCoupon;
