import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, ReferenceInput } from '../../types/GraphQL';
import { removeDiscountCodeAction } from '../../helpers/cart/actions';
import { Config } from './../../types/setup';

const removeCartCoupon = async (
  settings: Config,
  cart: Cart,
  discountCode: ReferenceInput,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart(settings, {
    id: cart.id,
    version: cart.version,
    actions: [removeDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default removeCartCoupon;
