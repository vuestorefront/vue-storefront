import * as types from '../mutation-types'
const bodybuilder = require('bodybuilder')
import { quickSearchByQuery } from '../../api/search'
import { entityKeyName } from '../../lib/entities'

function calculateProductTax (product, taxClasses) {
  let rateFound = false
  let taxClass = taxClasses.items.find((el) => el.product_tax_class_ids.indexOf(parseInt(product.tax_class_id) >= 0))
  if (taxClass) {
    for (let rate of taxClass.rates) { // TODO: add check for zip code ranges (!)
      if (rate.tax_country_id === global.__TAX_COUNTRY__ && (rate.region_name === global.__TAX_REGION__ || rate.tax_region_id === 0 || !rate.region_name)) {
        product.priceInclTax = (product.price + product.price * (parseFloat(rate.rate) / 100))
        product.priceTax = (product.price * (parseFloat(rate.rate) / 100))

        product.specialPriceInclTax = (parseFloat(product.special_price) + parseFloat(product.special_price) * (parseFloat(rate.rate) / 100))
        product.specialPriceTax = (parseFloat(product.special_price) * (parseFloat(rate.rate) / 100))

        if (product.special_price) {
          product.originalPrice = product.price
          product.originalPriceInclTax = product.priceInclTax
          product.originalPriceTax = product.priceTax

          product.price = parseFloat(product.special_price)
          product.priceInclTax = product.specialPriceInclTax
          product.priceTax = product.specialPriceTax
        }
        if (product.configurable_children) {
          for (let configurableChild of product.configurable_children) {
            for (let opt of configurableChild.custom_attributes) {
              configurableChild[opt.attribute_code] = opt.value
            }
            configurableChild.priceInclTax = (configurableChild.price + configurableChild.price * (parseFloat(rate.rate) / 100))
            configurableChild.priceTax = (configurableChild.price * (parseFloat(rate.rate) / 100))

            configurableChild.specialPriceInclTax = (parseFloat(configurableChild.special_price) + parseFloat(configurableChild.special_price) * (parseFloat(rate.rate) / 100))
            configurableChild.specialPriceTax = (parseFloat(configurableChild.special_price) * (parseFloat(rate.rate) / 100))

            if (configurableChild.special_price) {
              configurableChild.originalPrice = configurableChild.price
              configurableChild.originalPriceInclTax = configurableChild.priceInclTax
              configurableChild.originalPriceTax = configurableChild.priceTax

              configurableChild.price = configurableChild.special_price
              configurableChild.priceInclTax = configurableChild.specialPriceInclTax
              configurableChild.priceTax = configurableChild.specialPriceTax
            } else {
              configurableChild.special_price = 0
            }

            if (configurableChild.priceInclTax < product.priceInclTax) { // always show the lowest price
              product.priceInclTax = configurableChild.priceInclTax
              product.priceTax = configurableChild.priceTax
              product.price = configurableChild.price
              product.special_price = configurableChild.special_price
              product.specialPriceInclTax = configurableChild.specialPriceInclTax
              product.specialPriceTax = configurableChild.specialPriceTax
              product.originalPrice = configurableChild.originalPrice
              product.originalPriceInclTax = configurableChild.originalPriceInclTax
              product.originalPriceTax = configurableChild.originalPriceTax
            }
          }
        }
        rateFound = true
        console.debug('Tax rate ' + rate.code + ' = ' + rate.rate + '% found for ' + global.__TAX_COUNTRY__ + ' / ' + global.__TAX_REGION__)
        break
      }
    }
  }
  if (!rateFound) {
    console.log('No such tax class id: ' + product.tax_class_id + ' or rate not found for ' + global.__TAX_COUNTRY__ + ' / ' + global.__TAX_REGION__)
    product.priceInclTax = product.price
    product.priceTax = 0
    product.specialPriceInclTax = 0
    product.specialPriceTax = 0
    if (product.configurable_children) {
      for (let configurableChildren of product.configurable_children) {
        configurableChildren.priceInclTax = configurableChildren.price
        configurableChildren.priceTax = 0
        configurableChildren.specialPriceInclTax = 0
        configurableChildren.specialPriceTax = 0
      }
    }
  }
}
/**
 * Calculate taxes for specific product collection
 */
function calculateTaxes (products, store) {
  return new Promise((resolve, reject) => {
    store.dispatch('tax/list', { query: '' }, { root: true }).then((tcs) => { // TODO: move it to the server side for one requests OR cache in indexedDb
      for (let product of products) {
        product = calculateProductTax(product, tcs)
      }
      resolve(products)
    })
  })
}

const state = {
  breadcrumbs: {routes: []},
  configured: null, // configured product with variant selected
  current: null, // shown product
  current_options: {color: [], size: []},
  current_configuration: {},
  list: [],
  original: null, // default, not configured product
  related: {}
}

const getters = {
  productCurrent: (state) => state.current,
  currentConfiguration: (state) => state.current_configuration,
  productOriginal: (state) => state.original,
  currentOptions: (state) => state.current_options,
  breadcrumbs: (state) => state.breadcrumbs
}

function configureProductAsync (context, { product, configuration, updateCurrentProduct = true }) {
  // use current product if product wasn't passed
  if (product === null) product = context.getters.productCurrent
  const hasConfigurableChildren = (product.configurable_children && product.configurable_children.length > 0)

  if (hasConfigurableChildren) {
    // handle custom_attributes for easier comparing in the future
    product.configurable_children.forEach((child) => {
      let customAttributesAsObject = {}
      child.custom_attributes.forEach((attr) => {
        customAttributesAsObject[attr.attribute_code] = attr.value
      })
      // add values from custom_attributes in a different form
      Object.assign(child, customAttributesAsObject)
    })
    // find selected variant
    let selectedVariant = product.configurable_children.find((configurableChild) => {
      if (configuration.sku) {
        return configurableChild.sku === configuration.sku // by sku or first one
      } else {
        return Object.keys(configuration).every((configProperty) => {
          return parseInt(configurableChild[configProperty]) === parseInt(configuration[configProperty].id)
        })
      }
    }) || product.configurable_children[0]
    // use chosen variant
    if (updateCurrentProduct) {
      context.dispatch('setCurrent', selectedVariant)
    }
    return selectedVariant
  } else {
    return product
  }
}

// actions
const actions = {

  /**
   * Reset current configuration and selected variatnts
   */
  reset (context) {
    const productOriginal = context.getters.productOriginal
    context.commit(types.CATALOG_RESET_PRODUCT, productOriginal)
  },
  /**
   * Search ElasticSearch catalog of products using simple text query
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   * @param {Object} query elasticSearch request body
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  list (context, { query, start = 0, size = 50, entityType = 'product', sort = '' }) {
    return quickSearchByQuery({ query, start, size, entityType, sort }).then((resp) => {
      return calculateTaxes(resp.items, context).then((updatedProducts) => {
        // handle cache
        const cache = global.db.elasticCacheCollection
        for (let prod of resp.items) { // we store each product separately in cache to have offline access to products/single method
          const cacheKey = entityKeyName('id', prod.id)
          cache.setItem(cacheKey, prod)
            .catch((err) => {
              console.error('Cannot store cache for ' + cacheKey + ', ' + err)
            })
        }
        // commit update products list mutation
        context.commit(types.CATALOG_UPD_PRODUCTS, resp)
        return resp
      })
    }).catch(function (err) {
      console.error(err)
    })
  },

  /**
   * Search products by specific field
   * @param {Object} options
   */
  single (context, { options, setCurrentProduct = true, selectDefaultVariant = true }) {
    const cacheKey = entityKeyName('id', options.id)

    return new Promise((resolve, reject) => {
      const benchmarkTime = new Date()
      const cache = global.db.elasticCacheCollection
      cache.getItem(cacheKey, (err, res) => {
        // report errors
        if (err) {
          console.error({
            info: 'Get item from cache in ./store/modules/product.js',
            err
          })
        }
        const setupProduct = (prod) => {
          // set original product
          context.dispatch('setOriginal', prod)
          // check is prod has configurable children
          const hasConfigurableChildren = prod && prod.configurable_children && prod.configurable_children.length
          // set current product - configurable or not
          if (prod.type_id === 'configurable' && hasConfigurableChildren) {
            // set first available configuration
            // todo: probably a good idea is to change this [0] to specific id
            configureProductAsync(context, { product: prod, configuration: { sku: options.sku } })
          } else context.dispatch('setCurrent', prod)
          return prod
        }
        if (res !== null) {
          console.debug('Product:single - result from localForage for ' + cacheKey + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
          resolve(setupProduct(res))
        } else {
          context.dispatch('list', {
            query: bodybuilder()
              .query('match', 'id', options.id)
              .build()
          }).then((res) => {
            if (res && res.items && res.items.length) resolve(setupProduct(res.items[0]))
          })
        }
      })// .catch((err) => { console.error('Cannot read cache for ' + cacheKey + ', ' + err) })
    })
  },
  /**
   * Configure product with given configuration and set it as current
   * @param {Object} context
   * @param {Object} product
   * @param {Array} configuration
   */
  configure (context, { product = null, configuration, updateCurrentProduct = true }) {
    return configureProductAsync(context, { product: product, configuration: configuration, updateCurrentProduct: updateCurrentProduct })
  },
  /**
   * Set current product with given variant's properties
   * @param {Object} context
   * @param {Object} productVariant
   */
  setCurrent (context, productVariant) {
    if (productVariant && typeof productVariant === 'object') {
      // get original product
      const productOriginal = context.getters.productOriginal
      // check if passed variant is the same as original
      const productUpdated = Object.assign(productOriginal, productVariant)
      context.commit(types.CATALOG_SET_PRODUCT_CURRENT, productUpdated)
    } else console.debug('Unable to update current product.')
  },
  /**
   * Set given product as original
   * @param {Object} context
   * @param {Object} originalProduct
   */
  setOriginal (context, originalProduct) {
    if (originalProduct && typeof originalProduct === 'object') context.commit(types.CATALOG_SET_PRODUCT_ORIGINAL, originalProduct)
    else console.debug('Unable to setup original product.')
  },
  /**
   * Set related products
   */
  related (context, { key = 'related-products', items }) {
    context.commit(types.CATALOG_UPD_RELATED, { key, items })
  }
}

// mutations
const mutations = {
  [types.CATALOG_UPD_RELATED] (state, { key, items }) {
    state.related[key] = items
  },
  [types.CATALOG_UPD_PRODUCTS] (state, products) {
    state.list = products // extract fields from ES _source
  },
  [types.CATALOG_SET_PRODUCT_CURRENT] (state, product) {
    state.current = product
  },
  [types.CATALOG_SET_PRODUCT_ORIGINAL] (state, product) {
    state.original = product
  },
  [types.CATALOG_RESET_PRODUCT] (state, productOriginal) {
    state.current = productOriginal || {}
    state.current_configuration = {}
    state.current_options = {color: [], size: []}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
