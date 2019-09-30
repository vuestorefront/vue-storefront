import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { sha3_224 } from 'js-sha3'

const productChecksum = (product: CartItem): string =>
  sha3_224(JSON.stringify(product))

export default productChecksum
