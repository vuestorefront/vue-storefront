import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart } from '../../types/GraphQL';
import { addDiscountCodeAction } from '../../helpers/cart/actions';
import { apiClientMethodFactory } from './../../configuration';

async function applyCartCoupon(
  cart: Cart,
  discountCode: string,
  customQuery?: CustomQueryFn
): Promise<CartResponse> {
  return await updateCart.raw.bind(this)({
    id: cart.id,
    version: cart.version,
    actions: [addDiscountCodeAction(discountCode)]
  }, customQuery);
}

export default apiClientMethodFactory(applyCartCoupon);
