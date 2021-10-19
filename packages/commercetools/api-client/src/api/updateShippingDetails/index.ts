import { CustomQuery } from '@vue-storefront/core';
import updateCart from '../updateCart';
import { CartResponse } from '../../types/Api';
import { Cart, Address } from '../../types/GraphQL';
import { setShippingAddressAction } from '../../helpers/cart/actions';

/**
 * @remarks References:
 * {@link Cart}, {@link Address}, {@link CartResponse}
 */
const updateShippingDetails = async (context, cart: Cart, shippingDetails: Address, customQuery?: CustomQuery): Promise<CartResponse> => {
  const cartResponse = await updateCart(context, {
    id: cart.id,
    version: cart.version,
    actions: [setShippingAddressAction(shippingDetails)]
  }, customQuery);

  return cartResponse;
};

export default updateShippingDetails;
