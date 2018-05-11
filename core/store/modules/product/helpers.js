import config from '../../lib/config'
import rootStore from '../../'
import EventBus from '../../lib/event-bus'
import { calculateProductTax } from '../../lib/taxcalc'
import _ from 'lodash'
import { optionLabel } from '../attribute/helpers'
import i18n from '../../lib/i18n'

export function syncProductPrice (product, backProduct) { // TODO: we probably need to update the Net prices here as well
  product.sgn = backProduct.sgn // copy the signature for the modified price
  product.priceInclTax = backProduct.price_info.final_price
  product.originalPriceInclTax = backProduct.price_info.regular_price
  product.specialPriceInclTax = backProduct.price_info.special_price

  product.special_price = backProduct.price_info.extension_attributes.tax_adjustments.special_price
  product.price = backProduct.price_info.extension_attributes.tax_adjustments.final_price
  product.originalPrice = backProduct.price_info.extension_attributes.tax_adjustments.regular_price

  product.priceTax = product.priceInclTax - product.price
  product.specialPriceTax = product.specialPriceInclTax - product.special_price
  product.originalPriceTax = product.originalPriceInclTax - product.originalPrice

  if (product.priceInclTax >= product.originalPriceInclTax) {
    product.specialPriceInclTax = 0
    product.special_price = 0
  } else {
    product.special_price = 0 // the same price as original; it's not a promotion
  }
  EventBus.$emit('product-after-priceupdate', product)
  // console.log(product.sku, product, backProduct)
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
          product.priceInclTax = null
          product.originalPriceInclTax = null
          product.specialPriceInclTax = null

          product.special_price = null
          product.price = null
          product.originalPrice = null

          product.priceTax = null
          product.specialPriceTax = null
          product.originalPriceTax = null

          if (product.configurable_children) {
            for (let sc of product.configurable_children) {
              sc.priceInclTax = null
              sc.originalPriceInclTax = null
              sc.specialPriceInclTax = null

              sc.special_price = null
              sc.price = null
              sc.originalPrice = null

              sc.priceTax = null
              sc.specialPriceTax = null
              sc.originalPriceTax = null
            }
          }
        }
      }

      let skus = products.map((p) => { return p.sku })

      if (products.length === 1) { // single product - download child data
        const childSkus = _.flattenDeep(products.map((p) => { return (p.configurable_children) ? p.configurable_children.map((cc) => { return cc.sku }) : null }))
        skus = _.union(skus, childSkus)
      }
      console.log('Starting platform prices sync for', skus) // TODO: add option for syncro and non syncro return

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
      if (!config.products.waitForPlatformSync && !global.$VS.isSSR) {
        console.log('Returning products, the prices yet to come from backend!')
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
 * Calculate taxes for specific product collection
 */
export function calculateTaxes (products, store) {
  return new Promise((resolve, reject) => {
    if (config.tax.calculateServerSide) {
      console.log('Taxes calculated server side, skipping')
      doPlatformPricesSync(products).then((products) => {
        resolve(products)
      })
    } else {
      store.dispatch('tax/list', { query: '' }, { root: true }).then((tcs) => { // TODO: move it to the server side for one requests OR cache in indexedDb
        for (let product of products) {
          product = calculateProductTax(product, tcs.items, global.$VS.__TAX_COUNTRY__, global.$VS.__TAX_REGION__)
        }
        doPlatformPricesSync(products).then((products) => {
          resolve(products)
        })
      }) // TODO: run Magento2 prices request here if configured so in the config
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
      if (configOption.attribute_code) {
        const option = product.configurable_options.find(co => {
          return (co.attribute_code === configOption.attribute_code)
        })

        if (!option) {
          console.error('Wrong option id for setProductOptions', configOption.attribute_code)
          return null
        }
        let existingOption = configurable_item_options.find(cop => {
          return cop.option_id === option.attribute_id
        })
        if (!existingOption) {
          existingOption = {
            option_id: option.attribute_id,
            option_value: configOption.id,
            label: i18n.t(configOption.attribute_code),
            value: configOption.label
          }
          configurable_item_options.push(existingOption)
        }
        existingOption.option_value = configOption.id
        existingOption.label = i18n.t(configOption.attribute_code)
        existingOption.value = configOption.label
      }
    }
    console.log('Server product options object', product_option)
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
    return _.omit(op, ['label', 'value'])
  })
  return optionsMapped
}

export function populateProductConfigurationAsync (context, { product, selectedVariant }) {
  if (product.configurable_options) {
    for (let option of product.configurable_options) {
      let attr = context.rootState.attribute.list_by_id[option.attribute_id]
      let selectedOption = null
      if (selectedVariant.custom_attributes) {
        selectedOption = selectedVariant.custom_attributes.find((a) => {
          return (a.attribute_code === attr.attribute_code)
        })
      } else {
        selectedOption = {
          attribute_code: attr.attribute_code,
          value: selectedVariant[attr.attribute_code]
        }
      }
      const confVal = {
        attribute_code: attr.attribute_code,
        id: selectedOption.value,
        label: optionLabel(context.rootState.attribute, { attributeKey: selectedOption.attribute_code, searchBy: 'code', optionId: selectedOption.value })
      }
      context.state.current_configuration[attr.attribute_code] = confVal
      // @deprecated fallback for VS <= 1.0RC
      if (!('setupVariantByAttributeCode' in config.products) || config.products.setupVariantByAttributeCode === false) {
        const fallbackKey = attr.frontend_label ? attr.frontend_label : attr.default_frontend_label
        context.state.current_configuration[fallbackKey.toLowerCase()] = confVal // @deprecated fallback for VS <= 1.0RC
      }
    }
    if (config.cart.setConfigurableProductOptions) {
      const productOption = setConfigurableProductOptionsAsync(context, { product: product, configuration: context.state.current_configuration }) // set the custom options
      if (productOption) {
        selectedVariant.options = _internalMapOptions(productOption)
        selectedVariant.product_option = productOption
      }
    }
  }
  return selectedVariant
}

export function configureProductAsync (context, { product, configuration, selectDefaultVariant = true }) {
  // use current product if product wasn't passed
  if (product === null) product = context.getters.productCurrent
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
    let selectedVariant = product.configurable_children.find((configurableChild) => {
      if (configuration.sku) {
        return configurableChild.sku === configuration.sku // by sku or first one
      } else {
        return Object.keys(_.omit(configuration, ['price'])).every((configProperty) => {
          return _.toString(configurableChild[configProperty]) === _.toString(configuration[configProperty].id)
        })
      }
    }) || product.configurable_children[0]

    if (typeof navigator !== 'undefined') {
      if (selectedVariant && !navigator.onLine && context.state.offlineImage) { // this is fix for not preloaded images for offline
        selectedVariant.image = context.state.offlineImage
        console.log('Image offline fallback to ', context.state.offlineImage)
      }
    }

    product.is_configured = true

    if (config.cart.setConfigurableProductOptions && !selectDefaultVariant && !(Object.keys(configuration).length === 1 && configuration.sku)) {
      // the condition above: if selectDefaultVariant - then "setCurrent" is seeting the configurable options; if configuration = { sku: '' } -> this is a special case when not configuring the product but just searching by sku
      const productOption = setConfigurableProductOptionsAsync(context, { product: product, configuration: configuration }) // set the custom options
      if (productOption) {
        selectedVariant.product_option = productOption
        selectedVariant.options = _internalMapOptions(productOption)
      }
    } else {
      console.log('Skipping configurable options setup')
    }
    // use chosen variant
    if (selectDefaultVariant) {
      selectedVariant = _.omit(selectedVariant, 'name') // We need to send the parent SKU to the Magento cart sync but use the child SKU internally in this case
      context.dispatch('setCurrent', selectedVariant)
    }
    EventBus.$emit('product-after-configure', { product: product, configuration: configuration, selectedVariant: selectedVariant })
    return selectedVariant
  } else {
    return product
  }
}
