import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, ReferenceInput } from '../../types/GraphQL';
import { removeDiscountCodeAction } from '../../helpers/cart/actions';
import { apiClientMethodFactory } from './../../configuration';

async function removeCartCoupon (
  context,
  cart: Cart,
  discountCode: ReferenceInput,
  customQuery?: CustomQueryFn
): Promise<CartResponse> {
  return await updateCart.raw.bind(this)({
    id: cart.id,
    version: cart.version,
    actions: [removeDiscountCodeAction(discountCode)]
  }, customQuery);
}

export default apiClientMethodFactory(removeCartCoupon);
