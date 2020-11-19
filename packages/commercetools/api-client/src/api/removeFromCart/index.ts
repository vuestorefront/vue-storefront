import updateCart from './../updateCart';
import { CartResponse, CustomQueryFn } from './../../types/Api';
import { Cart, LineItem } from './../../types/GraphQL';
import { createRemoveLineItemAction } from './../../helpers/cart/actions';
import { Config } from './../../types/setup';

const removeFromCart = async (settings: Config, cart: Cart, product: LineItem, customQuery?: CustomQueryFn): Promise<CartResponse> => {
  return await updateCart(
    settings,
    {
      id: cart.id,
      version: cart.version,
      actions: [createRemoveLineItemAction(product)]
    },
    customQuery
  );
};

export default removeFromCart;
