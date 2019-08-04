import getProductOptions from './getProductOptions'

const ATTRIBUTES = ['color', 'size']

const getProductConfiguration = (product) => {
  const options = getProductOptions(product)
  const getAttributesFields = (attributeCode) =>
    options[attributeCode].find(c => c.id === parseInt(product[attributeCode]))

  if (!options) {
    return null
  }

  return ATTRIBUTES.reduce((prev, curr) => ({
    ...prev,
    [curr]: {
      attribute_code: curr,
      ...getAttributesFields(curr)
    }
  }), {})
}

export default getProductConfiguration
