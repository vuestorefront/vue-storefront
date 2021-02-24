import updateCart from '../updateCart';
import { CartResponse, CustomQueries } from '../../types/Api';
import { Cart, ReferenceInput } from '../../types/GraphQL';
import { removeDiscountCodeAction } from '../../helpers/cart/actions';

const removeCartCoupon = async (
  context,
  cart: Cart,
  discountCode: ReferenceInput,
  customQuery?: CustomQueries
): Promise<CartResponse> => {
  return await updateCart(context, {
    id: cart.id,
    version: cart.version,
    actions: [removeDiscountCodeAction(discountCode)]
  }, customQuery);
};

export default removeCartCoupon;
