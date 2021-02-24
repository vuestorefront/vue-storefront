import updateCart from '../updateCart';
import { CartResponse, CustomQueries } from '../../types/Api';
import { Cart, LineItem } from '../../types/GraphQL';
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions';

const updateCartQuantity = async (
  context,
  cart: Cart,
  product: LineItem,
  customQuery?: CustomQueries
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
