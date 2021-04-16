import { CustomQuery } from '@vue-storefront/core';
import updateCart from './../updateCart';
import { CartResponse } from './../../types/Api';
import { Cart, LineItem } from './../../types/GraphQL';
import { createRemoveLineItemAction } from './../../helpers/cart/actions';

const removeFromCart = async (context, cart: Cart, product: LineItem, customQuery?: CustomQuery): Promise<CartResponse> => {
  return await updateCart(
    context,
    {
      id: cart.id,
      version: cart.version,
      actions: [createRemoveLineItemAction(product)]
    },
    customQuery
  );
};

export default removeFromCart;
