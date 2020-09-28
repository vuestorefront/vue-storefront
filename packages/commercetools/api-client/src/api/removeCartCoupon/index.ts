import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, ReferenceInput } from '../../types/GraphQL';
import { removeDiscountCodeAction } from '../../helpers/cart/actions';

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
