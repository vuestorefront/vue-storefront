import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { ProductConfiguration } from '@vue-storefront/core/modules/catalog/types/ProductConfiguration'

const getAvailableFiltersByProduct = (product: Product) => {
  let filtersMap = {}
  if (product && product.configurable_options) {
    product.configurable_options.forEach(configurableOption => {
      const type = configurableOption.attribute_code
      const filterVariants = configurableOption.values.map(({ value_index, label }) => {
        return { id: value_index, label, type }
      })
      filtersMap[type] = filterVariants
    })
  }
  return filtersMap
}

const getSelectedFiltersByProduct = (product: Product, configuration: ProductConfiguration) => {
  if (!configuration) {
    return null
  }

  let selectedFilters = {}
  if (configuration && product) {
    Object.keys(configuration).map(filterType => {
      const filter = configuration[filterType]
      selectedFilters[filterType] = {
        id: filter.id,
        label: filter.label,
        type: filterType
      }
    })
  }
  return selectedFilters
}

export { getAvailableFiltersByProduct, getSelectedFiltersByProduct }
