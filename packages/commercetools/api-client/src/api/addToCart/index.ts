import { Context, CustomQuery } from '@vue-storefront/core';
import updateCart from './../updateCart';
import { CartDetails, CartResponse } from './../../types/Api';
import { ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';

/**
 * @remarks References:
 * {@link CartDetails}, {@link ProductVariant}, {@link CartResponse}
 */
const addToCart = async (
  context: Context,
  { id, version }: CartDetails,
  params: {
    product: ProductVariant;
    quantity: number;
    supplyChannel?: string;
    distributionChannel?: string;
  },
  customQuery?: CustomQuery
): Promise<CartResponse> => {

  return await updateCart(
    context,
    {
      id,
      version,
      actions: [createAddLineItemAction(params)]
    },
    customQuery
  );
};

export default addToCart;
