import { CartResponse } from '@vue-storefront/commercetools-api/lib/src/types/Api'
import { LineItem, Attribute } from './../../types/GraphQL'

const enhanceCart = (cartResponse: CartResponse): CartResponse => {
  const { lineItems } = cartResponse.data.cart

  cartResponse.data.cart.lineItems = lineItems.map((lineItem: LineItem) => ({
    ...lineItem,
    _configuration: lineItem.variant.attributeList
  }))

  return cartResponse
}

export default enhanceCart
