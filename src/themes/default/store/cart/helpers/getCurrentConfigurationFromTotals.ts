const getCurrentConfigurationFromTotals = (product) => {
  const { options } = product.totals
  const colorLabel = options.find(opt => opt.label === 'Color').value
  const sizeLabel = options.find(opt => opt.label === 'Size').value

  return {
    size: { id: product.size, attribute_code: 'size', label: sizeLabel },
    color: { id: product.color, attribute_code: 'color', label: colorLabel }
  }
}

export default getCurrentConfigurationFromTotals
