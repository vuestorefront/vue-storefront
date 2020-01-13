import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import productChecksum from './productChecksum';

const getChecksum = (product: CartItem) => {
  if (product.checksum) {
    return product.checksum
  }

  return productChecksum(product)
}

const getProductType = (product: CartItem): string =>
  product.type_id || product.product_type

const getServerItemId = (product: CartItem): string | number =>
  product.server_item_id || product.item_id

const isServerIdsEquals = (product1: CartItem, product2: CartItem): boolean => {
  const product1ItemId = getServerItemId(product1)
  const product2ItemId = getServerItemId(product2)

  const areItemIdsDefined = product1ItemId !== undefined && product2ItemId !== undefined

  return areItemIdsDefined && product1ItemId === product2ItemId
}

const isChecksumEquals = (product1: CartItem, product2: CartItem): boolean =>
  getChecksum(product1) === getChecksum(product2)

const productsEquals = (product1: CartItem, product2: CartItem): boolean => {
  if (!product1 || !product2) {
    return false
  }

  const typeProduct1 = getProductType(product1)
  const typeProduct2 = getProductType(product2)

  if (typeProduct1 === 'bundle' || typeProduct2 === 'bundle') {
    return isServerIdsEquals(product1, product2) || isChecksumEquals(product1, product2)
  }

  return isServerIdsEquals(product1, product2) || String(product1.sku) === String(product2.sku)
}

export default productsEquals
