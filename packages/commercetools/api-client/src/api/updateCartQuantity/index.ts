import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, LineItem } from '../../types/GraphQL';
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions';
import { Config } from './../../types/setup';

const updateCartQuantity = async (
  settings: Config,
  cart: Cart,
  product: LineItem,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart(
    settings,
    {
      id: cart.id,
      version: cart.version,
      actions: [createChangeLineItemQuantityAction(product)]
    },
    customQuery
  );
};

export default updateCartQuantity;
