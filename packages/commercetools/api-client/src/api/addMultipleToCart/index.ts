import { Context, CustomQuery } from '@vue-storefront/core';
import updateCart from './../updateCart';
import { CartDetails, CartResponse } from './../../types/Api';
import { LineItem } from './../../types/GraphQL';
import { createMultipleAddLineItemAction } from './../../helpers/cart/actions';

const addMultipleToCart = async (
  context: Context,
  { id, version }: CartDetails,
  products: LineItem[],
  customQuery?: CustomQuery
): Promise<CartResponse> => {

  return await updateCart(
    context,
    {
      id,
      version,
      actions: createMultipleAddLineItemAction(products)
    },
    customQuery
  );
};

export default addMultipleToCart;
