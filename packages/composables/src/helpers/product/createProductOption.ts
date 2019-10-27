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
    const option_id = Object.keys(c)[0]

    return { option_id, option_value: c[option_id] }
  })

  return options
}

const createBundleOptions = (configuration: ProductConfiguration) => {
  const options = createOptions()

  options.extension_attributes.bundle_options = configuration.map(c => {
    const option_id = Object.keys(c)[0]

    return {
      option_id,
      qty: c[option_id].qty,
      option_selections: [c[option_id].option]
    }
  })

  return options
}

export { createConfigurableItemOptions, createBundleOptions }
