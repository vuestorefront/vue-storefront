import { ProductResponse, BundleOptionProductLink } from '@vue-storefront/api-client/lib/types/Product'
import { ProductOption } from './../types'

const readBundleOptions = (product: ProductResponse): ProductOption[] =>
  product.bundle_options.map(
    ({ option_id, title, product_links }) => ({
      id: option_id,
      attributeName: title,
      values: product_links.map(
        (pl: BundleOptionProductLink) => ({ value: pl.id, label: pl.product.name })
      )
    })
  )

const readConfigurableOptions = (product: ProductResponse): ProductOption[] =>
  product.configurable_options.map(
   ({ attribute_code, attribute_id, values }) => ({
    id: attribute_id,
    attributeName: attribute_code,
    values: values.map(({ value_index, label }) => ({ value: value_index, label  }))
   })
  )

const getOptions = (product: ProductResponse): ProductOption[] => {
  if (!product) {
    return []
  }

  if (product.type_id === 'configurable') {
    return readConfigurableOptions(product)
  }

  if (product.type_id === 'bundle') {
    return readBundleOptions(product)
  }

  return []
}

export default getOptions
