import { ProductSelectedOptions } from '@vue-storefront/api-client/lib/types/Product'
import { ProductConfiguration, ProductMetadata } from './../types'

const createOptions = (): ProductSelectedOptions => ({
  product_options: {
    extension_attributes: {
      bundle_options: [],
      configurable_item_options: [],
      custom_options: []
    }
  }
})

const createConfigurableItemMetadata = (configuration: ProductConfiguration): ProductMetadata => {
  const options = createOptions()

  options.product_options.extension_attributes.configurable_item_options = configuration.items.map((c) => {
    // option_id should be id of the attribute now is string eg. 'color', 'size' etc.
    return { option_id: c.id, option_value: c.value }
  })

  return { product_options: options }
}

const createBundleMetadata = (configuration: ProductConfiguration): ProductMetadata => {
  const options = createOptions()

  options.product_options.extension_attributes.bundle_options = configuration.items.map(c => {
    return {
      option_id: c.id,
      option_qty: c.value.qty,
      option_selections: [c.value.option]
    }
  })

  return { product_options: options }
}

export { createConfigurableItemMetadata, createBundleMetadata }
