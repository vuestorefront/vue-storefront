import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { ProductConfiguration } from '@vue-storefront/core/modules/catalog/types/ProductConfiguration'
import getProductOptions from './getProductOptions'

const ATTRIBUTES = ['color', 'size']

const getProductConfiguration = (product: CartItem): ProductConfiguration => {
  const options = getProductOptions(product)
  const getAttributesFields = (attributeCode) =>
    (options[attributeCode] || []).find(c => c.id === parseInt(product[attributeCode]))

  if (!options) {
    return null
  }

  return ATTRIBUTES.reduce((prev, curr) => ({
    ...prev,
    [curr]: {
      attribute_code: curr,
      ...getAttributesFields(curr)
    }
  }), {}) as any as ProductConfiguration
}

export default getProductConfiguration
