import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart, LineItem } from '../../types/GraphQL';
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions';
import { CustomQueryFn } from '@vue-storefront/core';

const updateCartQuantity = async (
  cart: Cart,
  product: LineItem,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart(
    {
      id: cart.id,
      version: cart.version,
      actions: [createChangeLineItemQuantityAction(product)]
    },
    customQuery
  );
};

export default updateCartQuantity;
