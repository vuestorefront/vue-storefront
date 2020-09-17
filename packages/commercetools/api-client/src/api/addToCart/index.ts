import updateCart from './../updateCart';
import { CartResponse, CustomQueryFn } from './../../types/Api';
import { Cart, ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';

const addToCart = async (
  { id, version }: Cart,
  product: ProductVariant,
  quantity: number,
  customQuery?: CustomQueryFn
): Promise<CartResponse> => {
  console.log(id);
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
