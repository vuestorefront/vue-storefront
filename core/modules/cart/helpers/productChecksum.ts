import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { sha3_224 } from 'js-sha3'

const getDataToHash = (product: CartItem): any => {
  return {
    product_option: product.product_option,
    sku: product.sku
  }
}

const productChecksum = (product: CartItem): string =>
  sha3_224(JSON.stringify(getDataToHash(product)))

export default productChecksum
