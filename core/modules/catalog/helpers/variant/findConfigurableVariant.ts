import getConfigurationMatchLevel from './getConfigurationMatchLevel'
import getVariantWithLowestPrice from './getVariantWithLowestPrice'

export default function findConfigurableVariant ({ product, configuration = null, selectDefaultChildren = false, availabilityCheck = true, listOutOfStockProducts = true }) {
  const selectedVariant = product.configurable_children.reduce((prevVariant, nextVariant) => {
    if (availabilityCheck) {
      if (nextVariant.stock && !listOutOfStockProducts) {
        if (!nextVariant.stock.is_in_stock) {
          return prevVariant
        }
      }
    }
    if (nextVariant.status >= 2/** disabled product */) {
      return prevVariant
    }
    if (selectDefaultChildren) {
      return prevVariant || nextVariant // return first
    }
    if (
      (configuration && configuration.sku) &&
      (nextVariant.sku === configuration.sku)
    ) { // by sku or first one
      return nextVariant
    } else {
      const prevVariantMatch = getConfigurationMatchLevel(configuration, prevVariant)
      const nextVariantMatch = getConfigurationMatchLevel(configuration, nextVariant)

      if (prevVariantMatch === nextVariantMatch) {
        return getVariantWithLowestPrice(prevVariant, nextVariant)
      }

      return nextVariantMatch > prevVariantMatch ? nextVariant : prevVariant
    }
  }, undefined)
  return selectedVariant
}
