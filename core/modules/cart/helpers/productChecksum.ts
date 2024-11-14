import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import { sha3_224 } from 'js-sha3'
import get from 'lodash-es/get'
import flow from 'lodash-es/flow'
import cloneDeep from 'lodash-es/cloneDeep';
import ServerItem from '../types/Servertem';
import { isEmailCustomization, isFileUploadValue } from 'src/modules/customization-system';

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
  //TODO rewrite to keep implementation details in corresponding modules (customization-system, budsies, etc.)

  //ServerItem doesn't have the "customizations" field
  const emailCustomization = (product as any).customizations?.find(isEmailCustomization);

  let customizationState = product.extension_attributes?.customization_state;

  if (emailCustomization) {
    customizationState = customizationState?.filter((item) => item.customization_id !== emailCustomization.id);
  }

  if (customizationState && customizationState.length) {
    return customizationState.map(
      (customization) => {
        if (isFileUploadValue(customization.value)) {
          return Array.isArray(customization.value)
            ? customization.value.map((item) => item.id).sort()
            : customization.value.id;
        }

        if (typeof customization.value === 'string') {
          return customization.value;
        }

        return customization.value.sort();
      }
    ).sort();
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


  const giftCardOptions = product.product_option?.extension_attributes?.am_giftcard_options;

  if (giftCardOptions) {
    return {
      amount: (giftCardOptions.am_giftcard_amount || giftCardOptions.am_giftcard_amount_custom).toString(),
      image: giftCardOptions.am_giftcard_image.toString(),
      message: giftCardOptions.am_giftcard_message || '',
      recipient_name: giftCardOptions.am_giftcard_recipient_name || '',
      recipient_email: giftCardOptions.am_giftcard_recipient_email || '',
      sender: giftCardOptions.am_giftcard_sender_name || '',
      type: giftCardOptions.am_giftcard_type.toString()
    };
  }

  const supportedProductOptions = ['bundle_options', 'custom_options', 'configurable_item_options', 'am_giftcard_options'];
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
