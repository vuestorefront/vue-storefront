import Vue from 'vue'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import rootStore from '@vue-storefront/core/store'
import flattenDeep from 'lodash-es/flattenDeep'
import omit from 'lodash-es/omit'
import remove from 'lodash-es/remove'
import toString from 'lodash-es/toString'
import union from 'lodash-es/union'
// TODO: Remove this dependency
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'

/**
 * check if object have an image
 */
export const hasImage = (product) => product && product.image && product.image !== 'no_selection'
/**
 * check if one of the configuableChildren has an image
 */
export const childHasImage = (children = []) => children.some(hasImage)

const getVariantWithLowestPrice = (prevVariant, nextVariant) => {
  if (!prevVariant || !prevVariant.original_price_incl_tax) {
    return nextVariant
  }

  const prevPrice = prevVariant.price_incl_tax || prevVariant.original_price_incl_tax
  const nextPrice = nextVariant.price_incl_tax || nextVariant.original_price_incl_tax
  return nextPrice < prevPrice ? nextVariant : prevVariant
}

/**
 * Counts how much coniguration match for specific variant
 */
const getConfigurationMatchLevel = (configuration, variant): number => {
  if (!variant || !configuration) return 0
  const configProperties = Object.keys(omit(configuration, ['price']))
  return configProperties
    .map(configProperty => {
      const variantPropertyId = variant[configProperty]
      if (configuration[configProperty] === null) {
        return false
      }

      return [].concat(configuration[configProperty])
        .map(f => toString(f.id))
        .includes(toString(variantPropertyId))
    })
    .filter(Boolean)
    .length
}

export function findConfigurableChildAsync ({ product, configuration = null, selectDefaultChildren = false, availabilityCheck = true }) {
  const selectedVariant = product.configurable_children.reduce((prevVariant, nextVariant) => {
    if (availabilityCheck) {
      if (nextVariant.stock && !config.products.listOutOfStockProducts) {
        if (!nextVariant.stock.is_in_stock) {
          return prevVariant
        }
      }
    }
    if (nextVariant.status >= 2/** disabled product */) {
      return prevVariant
    }
    if (selectDefaultChildren) {
      return prevVariant || nextVariant // return first
    }
    if (configuration.sku && nextVariant.sku === configuration.sku) { // by sku or first one
      return nextVariant
    } else {
      const prevVariantMatch = getConfigurationMatchLevel(configuration, prevVariant)
      const nextVariantMatch = getConfigurationMatchLevel(configuration, nextVariant)

      if (prevVariantMatch === nextVariantMatch) {
        return getVariantWithLowestPrice(prevVariant, nextVariant)
      }

      return nextVariantMatch > prevVariantMatch ? nextVariant : prevVariant
    }
  }, undefined)
  return selectedVariant
}

export function isOptionAvailableAsync (context, { product, configuration }) {
  const variant = findConfigurableChildAsync({ product: product, configuration: configuration, availabilityCheck: true })
  return typeof variant !== 'undefined' && variant !== null
}

export function syncProductPrice (product, backProduct) { // TODO: we probably need to update the Net prices here as well
  product.sgn = backProduct.sgn // copy the signature for the modified price
  product.price_incl_tax = backProduct.price_info.final_price
  product.original_price_incl_tax = backProduct.price_info.regular_price
  product.special_price_incl_tax = backProduct.price_info.special_price

  product.special_price = backProduct.price_info.extension_attributes.tax_adjustments.special_price
  product.price = backProduct.price_info.extension_attributes.tax_adjustments.final_price
  product.original_price = backProduct.price_info.extension_attributes.tax_adjustments.regular_price

  product.price_tax = product.price_incl_tax - product.price
  product.special_price_tax = product.special_price_incl_tax - product.special_price
  product.original_price_tax = product.original_price_incl_tax - product.original_trice

  if (product.price_incl_tax >= product.original_price_incl_tax) {
    product.special_price_incl_tax = 0
    product.special_price = 0
  }

  /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
  product.priceInclTax = product.price_incl_tax
  product.priceTax = product.price_tax
  product.originalPrice = product.original_price
  product.originalPriceInclTax = product.original_price_incl_tax
  product.originalPriceTax = product.original_price_tax
  product.specialPriceInclTax = product.special_price_incl_tax
  product.specialPriceTax = product.special_price_tax
  /** END */
  EventBus.$emit('product-after-priceupdate', product)
  // Logger.log(product.sku, product, backProduct)()
  return product
}
/**
 * Synchronize / override prices got from ElasticSearch with current one's from Magento2 or other platform backend
 * @param {Array} products
 */
export function doPlatformPricesSync (products) {
  return new Promise((resolve, reject) => {
    if (config.products.alwaysSyncPlatformPricesOver) {
      if (config.products.clearPricesBeforePlatformSync) {
        for (let product of products) { // clear out the prices as we need to sync them with Magento
          product.price_incl_tax = null
          product.original_price_incl_tax = null
          product.special_price_incl_tax = null

          product.special_price = null
          product.price = null
          product.original_price = null

          product.price_tax = null
          product.special_price_tax = null
          product.original_price_tax = null

          /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
          product.priceInclTax = product.price_incl_tax
          product.priceTax = product.price_tax
          product.originalPrice = product.original_price
          product.originalPriceInclTax = product.original_price_incl_tax
          product.originalPriceTax = product.original_price_tax
          product.specialPriceInclTax = product.special_price_incl_tax
          product.specialPriceTax = product.special_price_tax
          /** END */

          if (product.configurable_children) {
            for (let sc of product.configurable_children) {
              sc.price_incl_tax = null
              sc.original_price_incl_tax = null
              sc.special_price_incl_tax = null

              sc.special_price = null
              sc.price = null
              sc.original_price = null

              sc.price_tax = null
              sc.special_price_tax = null
              sc.original_price_tax = null

              /** BEGIN @deprecated - inconsitent naming kept just for the backward compatibility */
              sc.priceInclTax = sc.price_incl_tax
              sc.priceTax = sc.price_tax
              sc.originalPrice = sc.original_price
              sc.originalPriceInclTax = sc.original_price_incl_tax
              sc.originalPriceTax = sc.original_price_tax
              sc.specialPriceInclTax = sc.special_price_incl_tax
              sc.specialPriceTax = sc.special_price_tax
              /** END */
            }
          }
        }
      }

      let skus = products.map((p) => { return p.sku })

      if (products.length === 1) { // single product - download child data
        const childSkus = flattenDeep(products.map((p) => { return (p.configurable_children) ? p.configurable_children.map((cc) => { return cc.sku }) : null }))
        skus = union(skus, childSkus)
      }
      if (skus && skus.length > 0) {
        Logger.log('Starting platform prices sync for', skus) // TODO: add option for syncro and non syncro return()
        rootStore.dispatch('product/syncPlatformPricesOver', { skus: skus }, { root: true }).then((syncResult) => {
          if (syncResult) {
            syncResult = syncResult.items

            for (let product of products) {
              const backProduct = syncResult.find((itm) => { return itm.id === product.id })
              if (backProduct) {
                product.price_is_current = true // in case we're syncing up the prices we should mark if we do have current or not
                product.price_refreshed_at = new Date()
                product = syncProductPrice(product, backProduct)

                if (product.configurable_children) {
                  for (let configurableChild of product.configurable_children) {
                    const backProductChild = syncResult.find((itm) => { return itm.id === configurableChild.id })
                    if (backProductChild) {
                      configurableChild = syncProductPrice(configurableChild, backProductChild)
                    }
                  }
                }
                // TODO: shall we update local storage here for the main product?
              }
            }
          }
          resolve(products)
        })
      } else { // empty list of products
        resolve(products)
      }
      if (!config.products.waitForPlatformSync && !isServer) {
        Logger.log('Returning products, the prices yet to come from backend!')()
        for (let product of products) {
          product.price_is_current = false // in case we're syncing up the prices we should mark if we do have current or not
          product.price_refreshed_at = null
        }
        resolve(products)
      }
    } else {
      resolve(products)
    }
  })
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

function _prepareProductOption (product) {
  let product_option = {
    extension_attributes: {
      custom_options: [],
      configurable_item_options: [],
      bundle_options: []
    }
  }
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

export const setRequestCacheTags = ({ products = [] }) => {
  if (Vue.prototype.$cacheTags) {
    products.forEach((product) => {
      Vue.prototype.$cacheTags.add(`P${product.id}`);
    })
  }
}
