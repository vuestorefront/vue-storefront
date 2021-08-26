import Vue from 'vue'
// TODO: Remove this dependency
import { optionLabel } from './optionLabel'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import config from 'config'
import registerProductsMapping from './registerProductsMapping'
import getProductGallery from './getProductGallery'
import { findConfigurableVariant, isOptionAvailable } from './variant'
import { filterOutUnavailableVariants } from './stock'
import { doPlatformPricesSync } from './price'
import { setProductConfigurableOptions } from './productOptions'

/** Below helpers are not used from 1.12 and can be removed to reduce bundle */
import { populateProductConfigurationAsync, configureProductAsync } from './deprecatedHelpers'
export {
  populateProductConfigurationAsync,
  configureProductAsync
}
/***/

export {
  registerProductsMapping,
  getProductGallery,
  optionLabel,
  findConfigurableVariant as findConfigurableChildAsync,
  isOptionAvailable as isOptionAvailableAsync,
  filterOutUnavailableVariants,
  doPlatformPricesSync,
  setProductConfigurableOptions as setConfigurableProductOptionsAsync
}

export const hasConfigurableChildren = (product) => product && product.configurable_children && product.configurable_children.length
export const isGroupedProduct = (product) => product.type_id === 'grouped'
export const isBundleProduct = (product) => product.type_id === 'bundle'

/**
 * check if object have an image
 */
export const hasImage = (product) => product && product.image && product.image !== 'no_selection'
/**
 * check if one of the configuableChildren has an image
 */
export const childHasImage = (children = []) => children.some(hasImage)

function _prepareProductOption (product) {
  let product_option = {
    extension_attributes: {
      custom_options: [],
      configurable_item_options: [],
      bundle_options: []
    }
  }
  /* if (product.product_option) {
    product_option = product.product_option
  } */
  return product_option
}

export function setCustomProductOptionsAsync (context, { product, customOptions }) {
  const productOption = _prepareProductOption(product)
  productOption.extension_attributes.custom_options = customOptions
  return productOption
}

export function setBundleProductOptionsAsync (context, { product, bundleOptions }) {
  const productOption = _prepareProductOption(product)
  productOption.extension_attributes.bundle_options = bundleOptions
  return productOption
}

/**
 * Get media Gallery images from product
 */

export function getMediaGallery (product) {
  let mediaGallery = []
  if (product.media_gallery) {
    for (let mediaItem of product.media_gallery) {
      if (mediaItem.image) {
        let video = mediaItem.vid

        if (video && video.video_id) {
          video.id = video.video_id
          delete video.video_id
        }

        mediaGallery.push({
          'src': getThumbnailPath(mediaItem.image, config.products.gallery.width, config.products.gallery.height),
          'loading': getThumbnailPath(mediaItem.image, config.products.thumbnails.width, config.products.thumbnails.height),
          'error': getThumbnailPath(mediaItem.image, config.products.thumbnails.width, config.products.thumbnails.height),
          'video': video
        })
      }
    }
  }
  return mediaGallery
}

/**
 * Get images from configured attribute images
 */
export function attributeImages (product) {
  let attributeImages = []
  if (config.products.gallery.imageAttributes) {
    for (let attribute of config.products.gallery.imageAttributes) {
      if (product[attribute] && product[attribute] !== 'no_selection') {
        attributeImages.push({
          'src': getThumbnailPath(product[attribute], config.products.gallery.width, config.products.gallery.height),
          'loading': getThumbnailPath(product[attribute], 310, 300),
          'error': getThumbnailPath(product[attribute], 310, 300)
        })
      }
    }
  }
  return attributeImages
}
/**
 * Get configurable_children images from product if any
 * otherwise get attribute images
 */

export function configurableChildrenImages (product) {
  let configurableChildrenImages = []
  if (childHasImage(product.configurable_children)) {
    let configurableAttributes = product.configurable_options.map(option => option.attribute_code)
    configurableChildrenImages = product.configurable_children.map(child =>
      ({
        'src': getThumbnailPath((!hasImage(child) ? product.image : child.image), config.products.gallery.width, config.products.gallery.height),
        'loading': getThumbnailPath((!hasImage(child) ? product.image : child.image), config.products.thumbnails.width, config.products.thumbnails.height),
        'id': configurableAttributes.reduce((result, attribute) => {
          result[attribute] = child[attribute]
          return result
        }, {})
      })
    )
  } else {
    configurableChildrenImages = attributeImages(product)
  }
  return configurableChildrenImages
}

export const setRequestCacheTags = ({ products = [] }) => {
  if (Vue.prototype.$cacheTags) {
    products.forEach((product) => {
      Vue.prototype.$cacheTags.add(`P${product.id}`);
    })
  }
}
