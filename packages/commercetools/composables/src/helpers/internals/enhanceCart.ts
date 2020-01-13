import { CartResponse } from '@vue-storefront/commercetools-api/lib/src/types/Api'
import { LineItem, Attribute } from './../../types/GraphQL'
import { getAttributeValue } from './../attributes'

const transformAttribute = (attribute: Attribute) => ({
  name: attribute.name,
  value: getAttributeValue(attribute)
})

const enhanceCart = (cartResponse: CartResponse): CartResponse => {
  const { lineItems } = cartResponse.data.cart

  cartResponse.data.cart.lineItems = lineItems.map((lineItem: LineItem) => ({
    ...lineItem,
    _configuration: lineItem.variant.attributeList.map(transformAttribute)
  }))

  return cartResponse
}

export default enhanceCart
