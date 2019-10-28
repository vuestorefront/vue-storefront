import { ProductConfiguration, ProductConfigurationItem } from './../../types/Product'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { createConfigurableItemOptions, createBundleOptions } from './createProductOption'

const createProductConfiguration = (product: ProductResponse, configuration: ProductConfiguration) => {
  if (product.type_id === 'configurable') {
    const child = product.configurable_children.find((p: any) =>
      configuration.every((c: ProductConfigurationItem) => String(p[c.name]) === String(c.value))
    )

    return {
      configuration,
      product: child,
      product_option: createConfigurableItemOptions(configuration)
    }
  }

  if (product.type_id === 'bundle') {
    const linkedProducts = configuration.map(c => {
      const { product_links } = product.bundle_options.find(b => String(b.option_id) === String(c.id))

      return product_links.find((p: any) => String(c.value.option) === p.id).product
    })

    return {
      configuration,
      product: linkedProducts,
      product_option: createBundleOptions(configuration)
    }
  }

  return null
}

export default createProductConfiguration
