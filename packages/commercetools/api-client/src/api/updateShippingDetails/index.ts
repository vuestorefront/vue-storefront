import updateCart from '../updateCart';
import { CartResponse, CustomQueryFn } from '../../types/Api';
import { Cart, Address } from '../../types/GraphQL';
import { setShippingAddressAction } from '../../helpers/cart/actions';
import { Config } from './../../types/setup';

const updateShippingDetails = async (settings: Config, cart: Cart, shippingDetails: Address, customQueryFn?: CustomQueryFn): Promise<CartResponse> => {
  const cartResponse = await updateCart(settings, {
    id: cart.id,
    version: cart.version,
    actions: [setShippingAddressAction(shippingDetails)]
  }, customQueryFn);

  return cartResponse;
};

export default updateShippingDetails;
