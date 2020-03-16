import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import productChecksum, { getProductOptions } from './productChecksum';

type ProductEqualCheckFn = (product1: CartItem, product2: CartItem) => boolean

// 'id' check
const getServerItemId = (product: CartItem): string | number =>
  product.server_item_id || product.item_id
const isServerIdsEquals = (product1: CartItem, product2: CartItem): boolean => {
  const product1ItemId = getServerItemId(product1)
  const product2ItemId = getServerItemId(product2)

  const areItemIdsDefined = product1ItemId !== undefined && product2ItemId !== undefined

  return areItemIdsDefined && product1ItemId === product2ItemId
}

// 'checksum' check
const getChecksum = (product: CartItem) => {
  if (product.checksum) {
    return product.checksum
  }
  return productChecksum(product)
}
const isChecksumEquals = (product1: CartItem, product2: CartItem): boolean =>
  getChecksum(product1) === getChecksum(product2)

// 'sku' check
const isSkuEqual = (product1: CartItem, product2: CartItem): boolean =>
  String(product1.sku) === String(product2.sku)

/**
 * Returns product equality check function
 * @param checkName - determines what type of check we want to do
 */
const getCheckFn = (checkName: string): ProductEqualCheckFn => {
  switch (checkName) {
    case 'id': {
      return isServerIdsEquals
    }
    case 'checksum': {
      return isChecksumEquals
    }
    case 'sku': {
      return isSkuEqual
    }
    default: {
      return isSkuEqual
    }
  }
}

/**
 * It passes all types of checks and returns the first passed. The order of checks matters!
 */
const makeCheck = (product1: CartItem, product2: CartItem, checks: string[]): boolean => {
  for (let checkName of checks) {
    const fn = getCheckFn(checkName)
    if (fn(product1, product2)) {
      return true
    }
  }
}

const productsEquals = (product1: CartItem, product2: CartItem): boolean => {
  if (!product1 || !product2) {
    return false
  }

  const check = makeCheck.bind(null, product1, product2)

  if (getProductOptions(product1, 'bundle_options').length || getProductOptions(product2, 'bundle_options').length) {
    // bundle options skus are merged into one sku so we can't rely on 'sku'
    // by default we want to check server_item_id ('id'), we can also use 'checksum'
    return check(['id', 'checksum'])
  }

  if (getProductOptions(product1, 'custom_options').length || getProductOptions(product2, 'custom_options').length) {
    // in admin panel we can add different sku for specific custom option so we can't rely on 'sku'
    // by default we want to check server_item_id ('id'), we can also use 'checksum'
    return check(['id', 'checksum'])
  }

  if (getProductOptions(product1, 'configurable_item_options').length || getProductOptions(product2, 'configurable_item_options').length) {
    // 'sku' should be uniq for configurable products
    // we can't check 'id' because it is the same when user edit product in microcart, so it can give wrong result
    return check(['sku'])
  }

  // by default we want to check if server_item_id is equal and check sku as fallback
  // this is for 'simple' and 'group' products
  return check(['id', 'sku'])
}

export default productsEquals
