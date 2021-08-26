import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { sha3_224 } from 'js-sha3'
import get from 'lodash-es/get'
import flow from 'lodash-es/flow'
import cloneDeep from 'lodash-es/cloneDeep';

const replaceNumberToString = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      return replaceNumberToString(obj[key]);
    } else if (typeof obj[key] === 'number') {
      obj[key] = String(obj[key]);
    }
  });
  return obj;
}

const transformToArray = value => Array.isArray(value) ? value : Object.values(value)

export const getProductOptions = (product, optionsName) => {
  return flow([
    get,
    cloneDeep,
    transformToArray,
    replaceNumberToString
  ])(product, `product_option.extension_attributes.${optionsName}`, [])
}

const getDataToHash = (product: CartItem): any => {
  if (!product.product_option) {
    return null
  }

  const supportedProductOptions = ['bundle_options', 'custom_options', 'configurable_item_options']

  // returns first options that has array with options
  for (let optionName of supportedProductOptions) {
    const options = getProductOptions(product, optionName)
    if (options.length) {
      return options
    }
  }

  // if there are options that are not supported then just return all options
  return product.product_option
}

const productChecksum = (product: CartItem): string => sha3_224(JSON.stringify(getDataToHash(product)))

export default productChecksum
