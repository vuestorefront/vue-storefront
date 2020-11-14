import updateCart from './../updateCart';
import { CartResponse, CustomQueryFn } from './../../types/Api';
import { Cart, ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';
import { apiClientMethodFactory } from './../../configuration';

async function addToCart(
  { id, version }: Cart,
  product: ProductVariant,
  quantity: number,
  customQuery?: CustomQueryFn
): Promise<CartResponse> {
  return await updateCart.raw.bind(this)(
    {
      id,
      version,
      actions: [createAddLineItemAction(product, quantity)]
    },
    customQuery
  );
}

export default apiClientMethodFactory(addToCart);
