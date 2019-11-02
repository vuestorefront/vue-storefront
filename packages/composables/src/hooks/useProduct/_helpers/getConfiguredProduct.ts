import { ProductResponse, BundleOptionProductLink } from '@vue-storefront/api-client/lib/types/Product'
import { ProductConfiguration, ProductConfigurationItem, ProductVariant } from './../types'

const getConfiguredProduct = (product: ProductResponse, configuration: ProductConfiguration): ProductVariant => {
  if (!product || !configuration) {
    return null
  }

  if (product.type_id === 'configurable') {
    const child = product.configurable_children.find((p: any) =>
      configuration.items.every((c: ProductConfigurationItem) => String(p[c.id]) === String(c.value))
    )

    return child
  }

  if (product.type_id === 'bundle') {
    const linkedProducts = configuration.items.map(c => {
      const { product_links } = product.bundle_options.find(b => String(b.option_id) === String(c.id))

      return product_links.find((p: BundleOptionProductLink) => String(c.value.option) === p.id).product
    })

    return linkedProducts
  }

  return null
}

export default getConfiguredProduct
