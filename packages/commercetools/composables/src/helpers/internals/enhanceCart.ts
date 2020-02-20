import { CartResponse } from '@vue-storefront/commercetools-api/lib/src/types/Api';
import { LineItem } from './../../types/GraphQL';

export const enhanceLineItems = (lineItems) => lineItems.map((lineItem: LineItem) => ({
  ...lineItem,
  _configuration: lineItem.variant.attributeList
}));

const enhanceCart = (cartResponse: CartResponse): CartResponse => {
  const { lineItems } = cartResponse.data.cart;

  cartResponse.data.cart.lineItems = enhanceLineItems(lineItems);

  return cartResponse;
};

export default enhanceCart;
