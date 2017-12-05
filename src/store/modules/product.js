import * as types from '../mutation-types'
const bodybuilder = require('bodybuilder')
import { quickSearchByQuery } from '../../api/search'
import { entityKeyName } from '../../lib/entities'

const state = {
  list: [],
  current: null,
  current_options: {color: [], size: []},
  current_configuration: {},
  breadcrumbs: {routes: []},
  product_selected_variant: null
}

const getters = {
}

function calculateProductTax (product, taxClasses) {
  let rateFound = false
  let taxClass = taxClasses.items.find((el) => el.product_tax_class_ids.indexOf(parseInt(product.tax_class_id) >= 0))
  if (taxClass) {
    for (let rate of taxClass.rates) { // TODO: add check for zip code ranges (!)
      if (rate.tax_country_id === global.__TAX_COUNTRY__ && (rate.region_name === global.__TAX_REGION__ || rate.tax_region_id === 0 || !rate.region_name)) {
        product.priceInclTax = (product.price + product.price * (parseFloat(rate.rate) / 100))
        product.priceTax = (product.price * (parseFloat(rate.rate) / 100))

        product.specialPriceInclTax = (product.special_price + product.special_price * (parseFloat(rate.rate) / 100))
        product.specialPriceTax = (product.special_price * (parseFloat(rate.rate) / 100))

        if (product.special_price) {
          product.originalPrice = product.price
          product.originalPriceInclTax = product.priceInclTax
          product.originalPriceTax = product.priceTax

          product.price = product.special_price
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

// actions
const actions = {

  /**
   * Reset current configuration and selected variatnts
   */
  reset (context) {
    context.state.product_selected_variant = null
    context.state.current_configuration = {}
    context.state.current_options = {color: [], size: []}
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
        context.commit(types.CATALOG_UPD_PRODUCTS, resp)
        return resp
      })
    }).catch(function (err) {
      console.error(err)
    })
  },

  /**
   * Search products by specific field
   * @param {String} fieldName field name to search by
   * @param {Object} value expected value
   */
  single (context, { fieldName, value, setCurrentProduct = true, selectDefaultVariant = true }) {
    const cacheKey = entityKeyName(fieldName, value)

    return new Promise((resolve, reject) => {
      const benchmarkTime = new Date()
      const cache = global.db.elasticCacheCollection
      cache.getItem(cacheKey, (err, res) => {
        if (err) console.error(err)
        const setupProduct = (prod) => {
          // check is prod has configurable children
          const hasConfigurableChildren = prod && prod.configurable_children && prod.configurable_children.length
          // set passed product as current
          if (setCurrentProduct) context.state.current = prod
          if (selectDefaultVariant) {
            // todo: add support for variant selection from product list (parameters)
            if (prod.type_id === 'configurable' && hasConfigurableChildren) context.commit(types.CATALOG_UPD_SELECTED_VARIANT, Object.assign(prod, prod.configurable_children[0])) // todo: change prod.configurable_children[0] to specific child, probably by variant id
            else context.commit(types.CATALOG_UPD_SELECTED_VARIANT, prod)
          }
          return prod
        }
        if (res !== null) {
          console.debug('Product:single - result from localForage for ' + cacheKey + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
          resolve(setupProduct(res))
        } else {
          context.dispatch('list', { query: bodybuilder().query('match', fieldName, value).build() }).then((res) => {
            if (res && res.items.length > 0) {
              resolve(setupProduct(res.items[0])) // we don't store result into cache here as it's already populated by quickSerchByQuery (diffrent key)
            }
          })
        }
      })// .catch((err) => { console.error('Cannot read cache for ' + cacheKey + ', ' + err) })
    })
  },

  /**
   * Configure product - finding best suited variant regarding configuration attribute
   */
  configure (context, { product = null, configuration }) {
    const state = context.state
    // use current product if product wasn't passed
    if (product === null) product = state.current
    // handle custom_attributes for easier comparing in the future
    product.configurable_children.forEach((child) => {
      let customAttributesAsObject = {}
      child.custom_attributes.forEach((attr) => {
        customAttributesAsObject[attr.attribute_code] = attr.value
      })
      Object.assign(child, customAttributesAsObject)
    })
    // find selected variant
    let selectedVariant = product.configurable_children.find((configurableChild) => {
      return Object.keys(configuration).every((configProperty) => {
        return parseInt(configurableChild[configProperty]) === parseInt(configuration[configProperty].id)
      })
    })
    // use chosen variant
    context.commit(types.CATALOG_UPD_SELECTED_VARIANT, Object.assign(product, selectedVariant))
    return selectedVariant
  },

  /**
  * Select product on product page
   * @param {Object} context
   * @param {Object} child_product
   */
  selectVariant (context, { child_product }) {
    context.commit(types.CATALOG_UPD_SELECTED_VARIANT, child_product)
  }
}

// mutations
const mutations = {
  [types.CATALOG_UPD_PRODUCTS] (state, products) {
    const cache = global.db.elasticCacheCollection
    for (let prod of products.items) { // we store each product separately in cache to have offline acces for products/single method
      const cacheKey = entityKeyName('id', prod.id)
      cache.setItem(cacheKey, prod).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
    }
    state.list = products // extract fields from ES _source
  },
  [types.CATALOG_UPD_SELECTED_VARIANT] (state, product) {
    state.product_selected_variant = product
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
