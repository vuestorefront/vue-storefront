import { CustomQuery } from '@vue-storefront/core';
import updateCart from './../updateCart';
import { CartDetails, CartResponse } from './../../types/Api';
import { ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';

const addToCart = async (
  settings,
  { id, version }: CartDetails,
  product: ProductVariant,
  quantity: number,
  customQuery?: CustomQuery
): Promise<CartResponse> => {
  return await updateCart(
    settings,
    {
      id,
      version,
      actions: [createAddLineItemAction(product, quantity)]
    },
    customQuery
  );
};

export default addToCart;
