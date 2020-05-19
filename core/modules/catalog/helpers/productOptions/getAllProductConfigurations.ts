import { ProductOptions } from '@vue-storefront/core/modules/catalog/types/Product';

/**
 * It returns all available options for configurable product
 */
export default function getAllProductConfigurations ({ configurableOptions, configuration }): ProductOptions {
  const product_option: ProductOptions = {
    extension_attributes: {
      custom_options: [],
      configurable_item_options: [],
      bundle_options: []
    }
  }
  /* eslint camelcase: "off" */
  product_option.extension_attributes.configurable_item_options = Object.keys(configuration)
    .map((key) => configuration[key])
    .filter((configOption) =>
      configOption &&
        configOption.attribute_code &&
        configOption.attribute_code !== 'price'
    )
    .map((configOption) => ({
      configOption,
      productOption: configurableOptions.find((productConfigOption) => productConfigOption.attribute_code === configOption.attribute_code)
    }))
    .filter(({ productOption }) => productOption)
    .map(({ configOption, productOption }) => ({
      option_id: String(productOption.attribute_id),
      option_value: String(configOption.id),
      label: productOption.label || configOption.attribute_code,
      value: configOption.label
    }))

  return product_option
}
