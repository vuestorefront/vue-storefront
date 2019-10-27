import { ProductConfiguration, ProductConfigurationItem } from './../../types/Product'
import getAttributeNameById from './getAttributeNameById'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { createConfigurableItemOptions, createBundleOptions } from './createProductOption'

const createProductConfiguration = (product: ProductResponse, configuration: ProductConfiguration) => {
  if (product.type_id === 'configurable') {
    const child = product.configurable_children.find((p: any) =>
      configuration.every((c: ProductConfigurationItem)  => {
        const key: string = Object.keys(c)[0] as string
        return p[getAttributeNameById(key, product)] === c[key]
      })
    )

    return { product: child, product_option: createConfigurableItemOptions(configuration) }
  }

  if (product.type_id === 'bundle') {
    const linkedProducts = configuration.map(c => {
      const optionId = Object.keys(c)[0]
      const option = c[optionId].option
      const { product_links } = product.bundle_options.find(b => String(b.option_id) === optionId)

      return product_links.find(p => p.id === option).product
    })

    return { product: linkedProducts, product_option: createBundleOptions(configuration) }
  }

  return null
}

export default createProductConfiguration
