import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { ProductConfiguration } from '@vue-storefront/core/modules/catalog/types/ProductConfiguration'

interface ProductVariant {
  id: number,
  label: string,
  type: string
}

const getAvailableFiltersByProduct = (product: Product) => {
  let filtersMap: Record<string, ProductVariant[]> = {}
  if (product && product.configurable_options) {
    product.configurable_options.forEach(configurableOption => {
      const type = configurableOption.attribute_code

      if (!type || !configurableOption.values) {
        return;
      }

      const filterVariants: ProductVariant[] = [];

      configurableOption.values.forEach(({ value_index, label }) => {
        if (!product.configurable_children) {
          return;
        }

        const variantProduct = product.configurable_children.find(
          (child) => child[type].toString() === value_index.toString()
        );

        if (!variantProduct || !variantProduct.stock.is_in_stock) {
          return;
        }

        filterVariants.push({ id: value_index.toString(), label, type })
      });

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
export type { ProductVariant }
