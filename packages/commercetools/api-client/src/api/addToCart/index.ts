import updateCart from './../updateCart';
import { CartResponse, CustomQueries } from './../../types/Api';
import { Cart, ProductVariant } from './../../types/GraphQL';
import { createAddLineItemAction } from './../../helpers/cart/actions';

const addToCart = async (
  settings,
  { id, version }: Cart,
  product: ProductVariant,
  quantity: number,
  customQuery?: CustomQueries
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
