import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { sha3_224 } from 'js-sha3'
import get from 'lodash-es/get'
import flow from 'lodash-es/flow'
import cloneDeep from 'lodash-es/cloneDeep';
import ServerItem from '../types/Servertem';

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

const getDataToHash = (product: CartItem | ServerItem): any => {
  if (product.customerImages && product.customerImages.length) {
    return product.customerImages.map(item => item.id);
  }

  if (product.giftcard_options) {
    return {
      amount: product.giftcard_options.amount,
      giftcard_template_id: product.giftcard_options.giftcard_template_id,
      send_friend: product.giftcard_options.send_friend,
      customer_name: product.giftcard_options.customer_name,
      recipient_name: product.giftcard_options.recipient_name,
      recipient_email: product.giftcard_options.recipient_email,
      message: product.giftcard_options.message
    }
  }

  if (!product.product_option) {
    return null
  }

  const supportedProductOptions = ['bundle_options', 'custom_options', 'configurable_item_options']
  let selectedProductOptions: Record<string, any> | undefined;

  // add options that has array with selected options to the dictionary
  for (let optionName of supportedProductOptions) {
    const options = getProductOptions(product, optionName)
    if (options.length) {
      if (!selectedProductOptions) {
        selectedProductOptions = {};
      }

      selectedProductOptions[optionName] = options;
    }
  }

  if (selectedProductOptions) {
    return selectedProductOptions;
  }

  // if there are options that are not supported then just return all options
  return product.product_option
}

const productChecksum = (product: CartItem | ServerItem): string => sha3_224(JSON.stringify(getDataToHash(product)))

export default productChecksum
