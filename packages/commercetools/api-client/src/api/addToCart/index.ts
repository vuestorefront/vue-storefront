import updateCart from './../updateCart';
import { CartResponse, CustomQueryFn } from './../../types/Api';
import { Cart, ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';

const addToCart = async (
  context,
  { id, version }: Cart,
  product: ProductVariant,
  quantity: number,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  return await updateCart(
    context,
    {
      id,
      version,
      actions: [createAddLineItemAction(product, quantity)]
    },
    customQuery
  );
};

export default addToCart;
