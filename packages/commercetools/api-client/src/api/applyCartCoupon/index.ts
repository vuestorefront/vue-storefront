import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart } from '../../types/GraphQL';
import { addDiscountCodeAction } from '../../helpers/cart/actions';

const applyCartCoupon = async (
  context,
  cart: Cart,
  discountCode: string,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart(context, {
    id: cart.id,
    version: cart.version,
    actions: [addDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default applyCartCoupon;
