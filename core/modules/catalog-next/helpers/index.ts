import Vue from 'vue'
import {
  hasImage,
  childHasImage,
  findConfigurableChildAsync,
  isOptionAvailableAsync,
  syncProductPrice,
  doPlatformPricesSync,
  getMediaGallery,
  attributeImages,
  configurableChildrenImages,
  setCustomProductOptionsAsync,
  setBundleProductOptionsAsync
} from '@vue-storefront/core/modules/catalog/helpers'
import {
  optionLabel
} from '@vue-storefront/core/modules/catalog/helpers/optionLabel'
import {
  getOptimizedFields,
  storeProductToCache
} from '@vue-storefront/core/modules/catalog/helpers/search'

export const setRequestCacheTags = ({ products = [] }) => {
  if (Vue.prototype.$cacheTags) {
    products.forEach((product) => {
      Vue.prototype.$cacheTags.add(`P${product.id}`);
    })
  }
}

export {
  hasImage,
  childHasImage,
  findConfigurableChildAsync,
  isOptionAvailableAsync,
  syncProductPrice,
  doPlatformPricesSync,
  getMediaGallery,
  attributeImages,
  configurableChildrenImages,
  setCustomProductOptionsAsync,
  setBundleProductOptionsAsync,
  optionLabel,
  getOptimizedFields,
  storeProductToCache
}
