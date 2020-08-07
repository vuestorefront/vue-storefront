import { getCart, createCart } from '@vue-storefront/shopify-api';
import { CartParams } from '@vue-storefront/shopify-api/src/types';
import Cookies from 'js-cookie';

const loadCurrentCart = async (cartParams: CartParams) => {
  let cartResponse = null;
  if (cartParams && cartParams.id && cartParams.id !== '') {
    cartResponse = await getCart(cartParams);
  }
  if (cartResponse === null || cartResponse.order !== null) cartResponse = await createCart(cartParams);
  if (cartResponse && cartResponse.id) {
    Cookies.set('cart_id', cartResponse.id);
    Cookies.set('cart', cartResponse);
  }
  return cartResponse;
};

export default loadCurrentCart;
