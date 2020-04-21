import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart } from '../../types/GraphQL';
import { addDiscountCodeAction } from '../../helpers/cart/actions';

const applyCartCoupon = async (cart: Cart, discountCode: string): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [addDiscountCodeAction(discountCode)]
  });
};

export default applyCartCoupon;
