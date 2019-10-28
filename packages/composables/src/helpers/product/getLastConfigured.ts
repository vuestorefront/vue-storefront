const getLastConfigured = (configuredProducts: any, sku: string = '') => {
  const products = Object.keys(configuredProducts)
  const totalProducts = products.length

  if (totalProducts === 0) {
    return null
  }

  const targetSku = sku || products[totalProducts - 1]
  const productVariants = targetSku && configuredProducts[targetSku]

  if (!productVariants && productVariants.length === 0) {
    return null
  }

  return productVariants[productVariants.length - 1]
}

export default getLastConfigured
