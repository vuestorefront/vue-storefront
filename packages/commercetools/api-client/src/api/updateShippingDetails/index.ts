import { CustomQuery } from '@vue-storefront/core';
import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart, Address } from '../../types/GraphQL';
import { setShippingAddressAction } from '../../helpers/cart/actions';

const updateShippingDetails = async (context, cart: Cart, shippingDetails: Address, customQueryFn?: CustomQuery): Promise<CartResponse> => {
  const cartResponse = await updateCart(context, {
    id: cart.id,
    version: cart.version,
    actions: [setShippingAddressAction(shippingDetails)]
  }, customQueryFn);

  return cartResponse;
};

export default updateShippingDetails;
