import { UiCartProduct } from '@vue-storefront/interfaces';
import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart } from '../../types/GraphQL';
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions';

const updateCartQuantity = async (cart: Cart, product: UiCartProduct): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createChangeLineItemQuantityAction(product)]
  });
};

export default updateCartQuantity;
