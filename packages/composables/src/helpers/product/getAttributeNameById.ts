import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'

const getAttributeNameById = (id: string, product: ProductResponse): string => {
  if (product.type_id === 'configurable') {
    return product.configurable_options.find(o => String(o.attribute_id) === id).attribute_code
  }

  // TODO: bundles

  return ''
}

export default getAttributeNameById
