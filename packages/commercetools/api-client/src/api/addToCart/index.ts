import updateCart from './../updateCart';
import { CartResponse } from './../../types/Api';
import { Cart, ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';
import { CustomQueryFn } from '@vue-storefront/core';

const addToCart = async (
  { id, version }: Cart,
  product: ProductVariant,
  quantity: number,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart(
    {
      id,
      version,
      actions: [createAddLineItemAction(product, quantity)]
    },
    customQuery
  );
};

export default addToCart;
