import { ProductResponse } from "@vue-storefront/api-client/lib/types/Product"
import { ProductConfiguration } from './../types'

const getFirstConfiguration = (product: ProductResponse): ProductConfiguration => {
  if (product.type_id === 'configurable') {
    return {
      qty: 1,
      items: product.configurable_options.map(o => ({
        id: o.label.toLowerCase(),
        value: o.values[0].value_index,
      }))
    }
  }

  if (product.type_id === 'bundle') {
    return {
      qty: 1,
      items: product.bundle_options.map(b => ({
        id: b.option_id,
        value: { option: b.product_links[0].id, qty: 1 },
      }))
    }
  }

  return null
}

export default getFirstConfiguration
