import Vue from 'vue'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import omit from 'lodash-es/omit'
// TODO: Remove this dependency
import { optionLabel } from './optionLabel'
import i18n from '@vue-storefront/i18n'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import registerProductsMapping from './registerProductsMapping'
import getProductGallery from './getProductGallery'
import { findConfigurableVariant, isOptionAvailable } from './variant'
import { filterOutUnavailableVariants } from './stock'
import { doPlatformPricesSync } from './price'
import { setProductConfigurableOptions } from './productOptions'

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

export function populateProductConfigurationAsync (context, { product, selectedVariant }) {
  Logger.warn('deprecated, will be removed in 1.13')()
  if (product.configurable_options) {
    for (let option of product.configurable_options) {
      let attribute_code
      let attribute_label
      if (option.attribute_code) {
        attribute_code = option.attribute_code
        attribute_label = option.label ? option.label : (option.frontend_label ? option.frontend_label : option.default_frontend_label)
      } else {
        if (option.attribute_id) {
          let attr = context.rootState.attribute.list_by_id[option.attribute_id]
          if (!attr) {
            Logger.error('Wrong attribute given in configurable_options - can not find by attribute_id', option)()
            continue
          } else {
            attribute_code = attr.attribute_code
            attribute_label = attr.frontend_label ? attr.frontend_label : attr.default_frontend_label
          }
        } else {
          Logger.error('Wrong attribute given in configurable_options - no attribute_code / attribute_id', option)()
        }
      }
      let selectedOption = null
      if (selectedVariant.custom_attributes) {
        selectedOption = selectedVariant.custom_attributes.find((a) => { // this is without the "label"
          return (a.attribute_code === attribute_code)
        })
      } else {
        selectedOption = {
          attribute_code: attribute_code,
          value: selectedVariant[attribute_code]
        }
      }
      if (option.values && option.values.length) {
        const selectedOptionMeta = option.values.find(ov => { return ov.value_index === selectedOption.value })
        if (selectedOptionMeta) {
          selectedOption.label = selectedOptionMeta.label ? selectedOptionMeta.label : selectedOptionMeta.default_label
          selectedOption.value_data = selectedOptionMeta.value_data
        }
      }

      const confVal = {
        attribute_code: attribute_code,
        id: selectedOption.value,
        label: selectedOption.label ? selectedOption.label : /* if not set - find by attribute */optionLabel(context.rootState.attribute, { attributeKey: selectedOption.attribute_code, searchBy: 'code', optionId: selectedOption.value })
      }
      Vue.set(context.state.current_configuration, attribute_code, confVal)
    }
    setProductConfigurableOptions({
      product,
      configuration: context.state.current_configuration,
      setConfigurableProductOptions: config.cart.setConfigurableProductOptions
    }) // set the custom options
  }
  return selectedVariant
}

export function configureProductAsync (context, { product, configuration, selectDefaultVariant = true, fallbackToDefaultWhenNoAvailable = true, setProductErorrs = false }) {
  Logger.warn('deprecated, will be removed in 1.13')()
  // use current product if product wasn't passed
  if (product === null) product = context.getters.getCurrentProduct
  const hasConfigurableChildren = (product.configurable_children && product.configurable_children.length > 0)

  if (hasConfigurableChildren) {
    // handle custom_attributes for easier comparing in the future
    product.configurable_children.forEach((child) => {
      let customAttributesAsObject = {}
      if (child.custom_attributes) {
        child.custom_attributes.forEach((attr) => {
          customAttributesAsObject[attr.attribute_code] = attr.value
        })
        // add values from custom_attributes in a different form
        Object.assign(child, customAttributesAsObject)
      }
    })
    // find selected variant
    let desiredProductFound = false
    let selectedVariant = findConfigurableVariant({ product, configuration, availabilityCheck: true })
    if (!selectedVariant) {
      if (fallbackToDefaultWhenNoAvailable) {
        selectedVariant = findConfigurableVariant({ product, selectDefaultChildren: true, availabilityCheck: true }) // return first available child
        desiredProductFound = false
      } else {
        desiredProductFound = false
      }
    } else {
      desiredProductFound = true
    }

    if (selectedVariant) {
      if (!desiredProductFound && selectDefaultVariant /** don't change the state when no selectDefaultVariant is set */) { // update the configuration
        populateProductConfigurationAsync(context, { product: product, selectedVariant: selectedVariant })
        configuration = context.state.current_configuration
      }
      if (setProductErorrs) {
        product.errors = {} // clear the product errors
      }
      product.is_configured = true

      if (config.cart.setConfigurableProductOptions && !selectDefaultVariant && !(Object.keys(configuration).length === 1 && configuration.sku)) {
        // the condition above: if selectDefaultVariant - then "setCurrent" is seeting the configurable options; if configuration = { sku: '' } -> this is a special case when not configuring the product but just searching by sku
        setProductConfigurableOptions({
          product,
          configuration,
          setConfigurableProductOptions: config.cart.setConfigurableProductOptions
        }) // set the custom options
      }/* else {
        Logger.debug('Skipping configurable options setup', configuration)()
      } */
      const fieldsToOmit = ['name']
      if (!hasImage(selectedVariant)) fieldsToOmit.push('image')
      selectedVariant = omit(selectedVariant, fieldsToOmit) // We need to send the parent SKU to the Magento cart sync but use the child SKU internally in this case
      // use chosen variant for the current product
      if (selectDefaultVariant) {
        context.dispatch('setCurrent', selectedVariant)
      }
      EventBus.$emit('product-after-configure', { product: product, configuration: configuration, selectedVariant: selectedVariant })
    }
    if (!selectedVariant && setProductErorrs) { // can not find variant anyway, even the default one
      product.errors.variants = i18n.t('No available product variants')
      if (selectDefaultVariant) {
        context.dispatch('setCurrent', product) // without the configuration
      }
    }
    return selectedVariant
  } else {
    if (fallbackToDefaultWhenNoAvailable) {
      return product
    } else {
      return null
    }
  }
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
      if (product[attribute]) {
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
        'loading': getThumbnailPath(product.image, config.products.thumbnails.width, config.products.thumbnails.height),
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
