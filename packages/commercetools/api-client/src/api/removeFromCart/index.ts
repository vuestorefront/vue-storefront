import updateCart from './../updateCart';
import { CartResponse, CustomQueryFn } from './../../types/Api';
import { Cart, LineItem } from './../../types/GraphQL';
import { createRemoveLineItemAction } from './../../helpers/cart/actions';
import { apiClientMethodFactory } from './../../configuration';

async function removeFromCart(cart: Cart, product: LineItem, customQuery?: CustomQueryFn): Promise<CartResponse> {
  return await updateCart.raw.bind(this)(
    {
      id: cart.id,
      version: cart.version,
      actions: [createRemoveLineItemAction(product)]
    },
    customQuery
  );
}

export default apiClientMethodFactory(removeFromCart);
