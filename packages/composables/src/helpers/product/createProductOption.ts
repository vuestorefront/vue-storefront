import { ProductConfiguration } from './../../types/Product'

const createOptions = () => ({
  extension_attributes: {
    bundle_options: [],
    configurable_item_options: [],
    customOptions: []
  }
}) as any

const createConfigurableItemOptions = (configuration: ProductConfiguration) => {
  const options = createOptions()

  options.extension_attributes.configurable_item_options = configuration.map((c) => {
    return { option_id: c.id, option_value: c.value }
  })

  return options
}

const createBundleOptions = (configuration: ProductConfiguration) => {
  const options = createOptions()

  options.extension_attributes.bundle_options = configuration.map(c => {
    return {
      option_id: c.id,
      qty: c.value.qty,
      option_selections: [c.value.option]
    }
  })

  return options
}

export { createConfigurableItemOptions, createBundleOptions }
