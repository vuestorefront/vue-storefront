import { CustomQuery } from '@vue-storefront/core';
import updateCart from '../updateCart';
import { CartDetails, CartResponse } from '../../types/Api';
import { LineItem } from '../../types/GraphQL';
import { createChangeLineItemQuantityAction } from '../../helpers/cart/actions';

/**
 * @remarks References:
 * {@link CartDetails}, {@link LineItem}, {@link CartResponse}
 */
const updateCartQuantity = async (
  context,
  { id, version }: CartDetails,
  product: LineItem,
  customQuery?: CustomQuery
): Promise<CartResponse> => {
  return await updateCart(
    context,
    {
      id,
      version,
      actions: [createChangeLineItemQuantityAction(product)]
    },
    customQuery
  );
};

export default updateCartQuantity;
