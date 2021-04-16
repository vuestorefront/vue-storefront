import { CustomQuery } from '@vue-storefront/core';
import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart, LineItem } from '../../types/GraphQL';
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions';

const updateCartQuantity = async (
  context,
  cart: Cart,
  product: LineItem,
  customQuery?: CustomQuery
): Promise<CartResponse> => {
  return await updateCart(
    context,
    {
      id: cart.id,
      version: cart.version,
      actions: [createChangeLineItemQuantityAction(product)]
    },
    customQuery
  );
};

export default updateCartQuantity;
