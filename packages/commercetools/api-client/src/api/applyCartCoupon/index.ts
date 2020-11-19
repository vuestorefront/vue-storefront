import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart } from '../../types/GraphQL';
import { addDiscountCodeAction } from '../../helpers/cart/actions';
import { Config } from './../../types/setup';

const applyCartCoupon = async (
  settings: Config,
  cart: Cart,
  discountCode: string,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart(settings, {
    id: cart.id,
    version: cart.version,
    actions: [addDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default applyCartCoupon;
