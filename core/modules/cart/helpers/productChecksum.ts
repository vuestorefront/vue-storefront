import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { sha3_224 } from 'js-sha3'

const getDataToHash = (product: CartItem): any => {
  if (!product.product_option) {
    return null
  }

  const { extension_attributes } = product.product_option

  if (extension_attributes.bundle_options) {
    const { bundle_options } = extension_attributes
    return Array.isArray(bundle_options) ? bundle_options : Object.values(bundle_options)
  }

  if (extension_attributes.custom_options) {
    const { custom_options } = extension_attributes
    return Array.isArray(custom_options) ? custom_options : Object.values(custom_options)
  }

  return product.product_option
}

const productChecksum = (product: CartItem): string =>
  sha3_224(JSON.stringify(getDataToHash(product)))

export default productChecksum
