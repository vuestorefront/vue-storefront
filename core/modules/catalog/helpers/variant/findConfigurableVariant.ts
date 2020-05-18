import getConfigurationMatchLevel from './getConfigurationMatchLevel'
import getVariantWithLowestPrice from './getVariantWithLowestPrice'
import config from 'config'

/**
 * This function responsiblity is to find best matching variant for configurable product based on configuration object or stock availability.
 */
export default function findConfigurableVariant ({ product, configuration = null, selectDefaultChildren = false, availabilityCheck = true }) {
  const selectedVariant = product.configurable_children.reduce((prevVariant, nextVariant) => {
    if (availabilityCheck) {
      if (nextVariant.stock && !config.products.listOutOfStockProducts) {
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
      // get match level for each variant
      const prevVariantMatch = getConfigurationMatchLevel(configuration, prevVariant)
      const nextVariantMatch = getConfigurationMatchLevel(configuration, nextVariant)

      // if we have draw between prev variant and current variant then return one that has lowest price
      if (prevVariantMatch === nextVariantMatch) {
        return getVariantWithLowestPrice(prevVariant, nextVariant)
      }

      // return variant with best matching level
      return nextVariantMatch > prevVariantMatch ? nextVariant : prevVariant
    }
  }, undefined)
  return selectedVariant
}
