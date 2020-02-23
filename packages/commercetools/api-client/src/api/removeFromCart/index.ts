import updateCart from './../updateCart';
import { CartResponse } from './../../types/Api';
import { Cart, LineItem } from './../../types/GraphQL';
import { createRemoveLineItemAction } from './../../helpers/cart/actions';

const removeFromCart = async (cart: Cart, product: LineItem): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createRemoveLineItemAction(product)]
  });
};

export default removeFromCart;
