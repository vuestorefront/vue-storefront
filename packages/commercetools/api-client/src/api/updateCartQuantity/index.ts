import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, LineItem } from '../../types/GraphQL';
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions';
import { apiClientMethodFactory } from './../../configuration';

async function updateCartQuantity(
  cart: Cart,
  product: LineItem,
  customQuery?: CustomQueryFn
): Promise<CartResponse> {
  return await updateCart.raw.bind(this)(
    {
      id: cart.id,
      version: cart.version,
      actions: [createChangeLineItemQuantityAction(product)]
    },
    customQuery
  );
}

export default apiClientMethodFactory(updateCartQuantity);
