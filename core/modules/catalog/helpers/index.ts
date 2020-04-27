import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import rootStore from '@vue-storefront/core/store'
import flattenDeep from 'lodash-es/flattenDeep'
import omit from 'lodash-es/omit'
import remove from 'lodash-es/remove'
import toString from 'lodash-es/toString'
import union from 'lodash-es/union'
// TODO: Remove this dependency
import { optionLabel } from './optionLabel'
import i18n from '@vue-storefront/i18n'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'

function _filterRootProductByStockitem (context, stockItem, product, errorCallback) {
  if (stockItem) {
    product.stock = stockItem
    if (stockItem.is_in_stock === false) {
      product.errors.variants = i18n.t('No available product variants')
      context.state.current.errors = product.errors
      EventBus.$emit('product-after-removevariant', { product: product })
      if (config.products.listOutOfStockProducts === false) {
        errorCallback(new Error('Product query returned an empty result'))
      }
    }
  }
}

/**
 * check if object have an image
 */
export const hasImage = (product) => product && product.image && product.image !== 'no_selection'
/**
 * check if one of the configuableChildren has an image
 */
export const childHasImage = (children = []) => children.some(hasImage)

export function findConfigurableChildAsync ({ product, configuration = null, selectDefaultChildren = false, availabilityCheck = true }) {
  let regularProductPrice = product.original_price_incl_tax ? product.original_price_incl_tax : product.price_incl_tax
  let selectedVariant = product.configurable_children.find((configurableChild) => {
    if (availabilityCheck) {
      if (configurableChild.stock && !config.products.listOutOfStockProducts) {
        if (!configurableChild.stock.is_in_stock) {
          return false
        }
      }
    }
    if (configurableChild.status >= 2/** disabled product */) {
      return false
    }
    if (selectDefaultChildren) {
      return true // return first
    }
    if (configuration.sku) {
      return configurableChild.sku === configuration.sku // by sku or first one
    } else {
      if (!configuration || (configuration && Object.keys(configuration).length === 0)) { // no configuration - return the first child cheaper than the original price - if found
        if (configurableChild.price_incl_tax <= regularProductPrice) {
          return true
        }
      } else {
        return Object.keys(omit(configuration, ['price'])).every((configProperty) => {
          let configurationPropertyFilters = configuration[configProperty] || []
          if (!Array.isArray(configurationPropertyFilters)) configurationPropertyFilters = [configurationPropertyFilters]
          const configurationIds = configurationPropertyFilters.map(filter => toString(filter.id)).filter(filterId => !!filterId)
          if (!configurationIds.length) return true // skip empty
          return configurationIds.includes(toString(configurableChild[configProperty]))
        })
      }
    }
  })
  return selectedVariant
}

export function isOptionAvailableAsync (context, { product, configuration }) {
  const variant = findConfigurableChildAsync({ product: product, configuration: configuration, availabilityCheck: true })
  return typeof variant !== 'undefined' && variant !== null
}

function _filterChildrenByStockitem (context, stockItems, product, diffLog) {
  if (config.products.filterUnavailableVariants) {
    if (product.type_id === 'configurable' && product.configurable_children) {
      for (const stockItem of stockItems) {
        const confChild = product.configurable_children.find(p => { return p.id === stockItem.product_id })
        if (stockItem.is_in_stock === false || (confChild && confChild.status >= 2/* conf child is disabled */)) {
          product.configurable_children = product.configurable_children.filter((p) => { return p.id !== stockItem.product_id })
          diffLog.push(stockItem.product_id)
        } else {
          if (confChild) {
            confChild.stock = stockItem
          }
        }
      }
      let totalOptions = 0
      let removedOptions = 0
      for (const optionKey in context.state.current_options) {
        let optionsAvailable = context.state.current_options[optionKey] // TODO: it should take the attribute combinations into consideration
        if (optionsAvailable && optionsAvailable.length > 0) {
          optionsAvailable = optionsAvailable.filter((opt) => {
            const config = {}
            config[optionKey] = opt
            const variant = isOptionAvailableAsync(context, { product: product, configuration: config })
            if (!variant) {
              Logger.log('No variant for' + opt, 'helper')()
              EventBus.$emit('product-after-removevariant', { product: product })
              removedOptions++
              return false
            } else {
              totalOptions++
              return true
            }
          })
          Logger.debug('Options still available' + optionsAvailable + removedOptions, 'helper')()
          context.state.current_options[optionKey] = optionsAvailable
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      configureProductAsync(context, { product, configuration: context.state.current_configuration, selectDefaultVariant: true, fallbackToDefaultWhenNoAvailable: true })
      if (totalOptions === 0) {
        product.errors.variants = i18n.t('No available product variants')
        context.state.current.errors = product.errors
        EventBus.$emit('product-after-removevariant', { product: product })
      }
    }
  }
}

export function filterOutUnavailableVariants (context, product) {
  return new Promise((resolve, reject) => {
    if (config.products.filterUnavailableVariants) {
      const _filterConfigurableHelper = () => {
        if (product.type_id === 'configurable' && product.configurable_children) {
          const stockItems = []
          let confChildSkus = product.configurable_children.map((c) => { return c.sku })
          for (const confChild of product.configurable_children) {
            const stockCached = context.rootState.stock.cache[confChild.id]
            if (stockCached) {
              stockItems.push(stockCached)
              confChildSkus = remove(confChildSkus, (skuToCheck) => skuToCheck === confChild.sku)
            }
          }
          Logger.debug('Cached stock items and delta' + stockItems + confChildSkus)()
          if (confChildSkus.length > 0) {
            context.dispatch('stock/list', { skus: confChildSkus }, { root: true }).then((task) => {
              if (task && task.resultCode === 200) {
                const diffLog = []
                _filterChildrenByStockitem(context, union(task.result, stockItems), product, diffLog)
                Logger.debug('Filtered configurable_children with the network call' + diffLog, 'helper')()
                resolve()
              } else {
                Logger.error('Cannot sync the availability of the product options. Please update the vue-storefront-api or switch on the Internet', 'helper')()
              }
            }).catch(err => {
              Logger.error(err, 'helper')()
            })
          } else {
            const diffLog = []
            _filterChildrenByStockitem(context, stockItems, product, diffLog)
            Logger.debug('Filtered configurable_children without the network call' + diffLog, 'helper')()
            resolve()
          }
        } else {
          resolve()
        }
      }
      const rootStockCached = context.rootState.stock.cache[product.id]
      if (!rootStockCached) {
        context.dispatch('stock/list', { skus: [product.sku] }, { root: true }).then((task) => {
          _filterRootProductByStockitem(context, task && task.result && task.result.length ? task.result[0] : null, product, reject)
          Logger.debug('Filtered root product stock with the network call')()
          _filterConfigurableHelper()
        })
      } else {
        _filterRootProductByStockitem(context, rootStockCached, product, reject)
        Logger.debug('Filtered root product stock without the network call')()
        _filterConfigurableHelper()
      }
    } else {
      resolve()
    }
  })
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
export function setConfigurableProductOptionsAsync (context, { product, configuration }) {
  if (product.configurable_options) {
    const product_option = _prepareProductOption(product)
    /* eslint camelcase: "off" */
    const configurable_item_options = product_option.extension_attributes.configurable_item_options
    for (const configKey of Object.keys(configuration)) {
      const configOption = configuration[configKey]
      if (configOption.attribute_code && configOption.attribute_code !== 'price') {
        const option = product.configurable_options.find(co => {
          return (co.attribute_code === configOption.attribute_code)
        })

        if (!option) {
          Logger.error('Wrong option id for setProductOptions', configOption.attribute_code)()
          return null
        }
        let existingOption = configurable_item_options.find(cop => {
          return cop.option_id === option.attribute_id
        })
        if (!existingOption) {
          existingOption = {
            option_id: option.attribute_id,
            option_value: configOption.id,
            label: option.label || i18n.t(configOption.attribute_code),
            value: configOption.label
          }
          configurable_item_options.push(existingOption)
        }
        existingOption.option_value = configOption.id
        existingOption.label = option.label || i18n.t(configOption.attribute_code)
        existingOption.value = configOption.label
      }
    }
    // Logger.debug('Server product options object', product_option)()
    return product_option
  } else {
    return null
  }
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

function _internalMapOptions (productOption) {
  const optionsMapped = []
  for (let option of productOption.extension_attributes.configurable_item_options) {
    optionsMapped.push({
      label: option.label,
      value: option.value
    })
  }
  productOption.extension_attributes.configurable_item_options = productOption.extension_attributes.configurable_item_options.map((op) => {
    return omit(op, ['label', 'value'])
  })
  return optionsMapped
}

export function populateProductConfigurationAsync (context, { product, selectedVariant }) {
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
      context.state.current_configuration[attribute_code] = confVal
    }
    if (config.cart.setConfigurableProductOptions) {
      const productOption = setConfigurableProductOptionsAsync(context, { product: product, configuration: context.state.current_configuration }) // set the custom options
      if (productOption) {
        product.options = _internalMapOptions(productOption)
        product.product_option = productOption
      }
    }
  }
  return selectedVariant
}

export function configureProductAsync (context, { product, configuration, selectDefaultVariant = true, fallbackToDefaultWhenNoAvailable = true, setProductErorrs = false }) {
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
    let selectedVariant = findConfigurableChildAsync({ product, configuration, availabilityCheck: true })
    if (!selectedVariant) {
      if (fallbackToDefaultWhenNoAvailable) {
        selectedVariant = findConfigurableChildAsync({ product, selectDefaultChildren: true, availabilityCheck: true }) // return first available child
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
        const productOption = setConfigurableProductOptionsAsync(context, { product: product, configuration: configuration }) // set the custom options
        if (productOption) {
          selectedVariant.product_option = productOption
          selectedVariant.options = _internalMapOptions(productOption)
        }
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
