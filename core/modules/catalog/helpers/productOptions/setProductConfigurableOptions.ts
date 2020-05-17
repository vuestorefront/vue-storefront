import getAllProductConfigurations from './getAllProductConfigurations'
import getInternalOptionsFormat from './getInternalOptionsFormat'
import omitInternalOptionsFormat from './omitInternalOptionsFormat'

export default function setProductConfigurableOptions ({ product, configuration, setConfigurableProductOptions }) {
  if (!setConfigurableProductOptions) return

  const configurableOptions = product.configurable_options

  if (!configurableOptions) return

  const productOptions = getAllProductConfigurations({ configurableOptions, configuration })

  product.options = getInternalOptionsFormat(productOptions)

  omitInternalOptionsFormat(productOptions)

  product.product_option = productOptions
}
