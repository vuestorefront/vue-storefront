
const mapValues = (current) => (val) => ({
  id: val.value_index,
  label: val.label,
  attribute_code: current.attribute_code,
  type: current.attribute_code
})

const reduceOptions = (prev, curr) => ({
  ...prev,
  [curr.attribute_code]: curr.values.map(mapValues(curr))
})

const getProductOptions = (product) => {
  if (!product.configurable_options) {
    return null
  }

  return product.configurable_options
    .reduce(reduceOptions, {})
}

export default getProductOptions
