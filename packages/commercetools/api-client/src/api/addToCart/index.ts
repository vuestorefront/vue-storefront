import { Context, CustomQuery } from '@vue-storefront/core';
import updateCart from './../updateCart';
import { CartDetails, CartResponse } from './../../types/Api';
import { ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';

const addToCart = async (
  context: Context,
  { id, version }: CartDetails,
  product: ProductVariant,
  quantity: number,
  customQuery?: CustomQuery
): Promise<CartResponse> => {
  const { supplyChannel, distributionChannel } = customQuery;

  return await updateCart(
    context,
    {
      id,
      version,
      actions: [createAddLineItemAction(
        product,
        quantity,
        supplyChannel,
        distributionChannel
      )]
    },
    customQuery
  );
};

export default addToCart;
