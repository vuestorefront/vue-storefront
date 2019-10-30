import { ProductConfiguration, ProductConfigurationItem, ProductVariant } from './../types'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { createConfigurableItemMetadata, createBundleMetadata  } from './createProductMetadata'

const createProductVariant = (
  product: ProductResponse, configuration: ProductConfiguration
): ProductVariant => {
  if (product.type_id === 'configurable') {
    const child = product.configurable_children.find((p: any) =>
      configuration.items.every((c: ProductConfigurationItem) => String(p[c.id]) === String(c.value))
    )

    return {
      parentSku: product.sku,
      configuration,
      product: child,
      meta: createConfigurableItemMetadata(configuration)
    }
  }

  if (product.type_id === 'bundle') {
    const linkedProducts = configuration.items.map(c => {
      const { product_links } = product.bundle_options.find(b => String(b.option_id) === String(c.id))

      return product_links.find((p: any) => String(c.value.option) === p.id).product
    })

    return {
      parentSku: product.sku,
      configuration,
      product: linkedProducts,
      meta: createBundleMetadata(configuration)
    }
  }

  return null
}

export default createProductVariant
