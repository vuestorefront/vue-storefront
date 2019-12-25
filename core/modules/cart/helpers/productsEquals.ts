import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import productChecksum from './productChecksum';

interface CustomOption {
  option_id: any,
  option_value: any
}

const getChecksum = (product: CartItem) => {
  if (product.checksum) {
    return product.checksum
  }

  return productChecksum(product)
}

const getProductType = (product: CartItem): string =>
  product ? product.type_id || product.product_type : null

const getServerItemId = (product: CartItem): string | number =>
  product ? product.server_item_id || product.item_id : null

const isServerIdsEquals = (product1: CartItem, product2: CartItem): boolean => {
  const product1ItemId = getServerItemId(product1)
  const product2ItemId = getServerItemId(product2)
  const areItemIdsDefined = product1ItemId !== undefined && product2ItemId !== undefined

  return areItemIdsDefined && product1ItemId === product2ItemId
}

const isChecksumEquals = (product1: CartItem, product2: CartItem): boolean =>
  getChecksum(product1) === getChecksum(product2)

const hasCustomOptions = (product: CartItem): boolean => product.product_option && product.product_option.extension_attributes && product.product_option.extension_attributes.custom_options && (product.product_option.extension_attributes.custom_options.length > 0 || Object.keys(product.product_option.extension_attributes.custom_options).length > 0)

const hasAnyDifferentCustomOptionsValue = (customOptions1: CustomOption[], customOptions2: CustomOption[]): boolean => {
  let customOptionsOne = customOptions1 instanceof Array ? customOptions1 : Object.values(customOptions1)
  let customOptionsTwo = customOptions2 instanceof Array ? customOptions2 : Object.values(customOptions2)
  let hasAnyDifferentOption = false
  customOptionsOne.forEach((option1: CustomOption) => {
    customOptionsTwo.forEach((option2: CustomOption) => {
      if (option1.option_id.toString() === option2.option_id.toString()) {
        if (option1.option_value.toString() !== option2.option_value.toString()) {
          hasAnyDifferentOption = true
        }
      }
    })
  })
  return hasAnyDifferentOption
}

const productsEquals = (product1: CartItem, product2: CartItem): boolean => {
  if (!product1 || !product2) {
    return false
  }

  const typeProduct1 = getProductType(product1)
  const typeProduct2 = getProductType(product2)

  const hasProductCustomOption1 = hasCustomOptions(product1)
  const hasProductCustomOption2 = hasCustomOptions(product2)

  if (typeProduct1 === 'bundle' || typeProduct2 === 'bundle') {
    return isServerIdsEquals(product1, product2) || isChecksumEquals(product1, product2)
  }

  if (hasProductCustomOption1 && hasProductCustomOption2) {
    const productCustomOptions1 = product1.product_option.extension_attributes.custom_options
    const productCustomOptions2 = product2.product_option.extension_attributes.custom_options
    return !hasAnyDifferentCustomOptionsValue(productCustomOptions1, productCustomOptions2)
  }

  return String(product1.sku) === String(product2.sku)
}

export default productsEquals
