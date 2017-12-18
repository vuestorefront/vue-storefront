import * as types from '../mutation-types'
import config from '../../config.json'
const bodybuilder = require('bodybuilder')
import { quickSearchByQuery } from '../../api/search'
import { entityKeyName } from '../../lib/entities'
import { optionLabel } from 'src/store/modules/attribute'
import { breadCrumbRoutes } from 'src/lib/filters'

function calculateProductTax (product, taxClasses) {
  let rateFound = false
  let taxClass = taxClasses.items.find((el) => el.product_tax_class_ids.indexOf(parseInt(product.tax_class_id) >= 0))
  if (taxClass) {
    for (let rate of taxClass.rates) { // TODO: add check for zip code ranges (!)
      if (rate.tax_country_id === global.__TAX_COUNTRY__ && (rate.region_name === global.__TAX_REGION__ || rate.tax_region_id === 0 || !rate.region_name)) {
        product.priceInclTax = (product.price + product.price * (parseFloat(rate.rate) / 100))
        product.priceTax = (product.price * (parseFloat(rate.rate) / 100))
        product.price = parseFloat(product.price)
        product.special_price = parseFloat(product.special_price)

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
            configurableChild.price = parseFloat(configurableChild.price)
            configurableChild.priceInclTax = (configurableChild.price + configurableChild.price * (parseFloat(rate.rate) / 100))
            configurableChild.priceTax = (configurableChild.price * (parseFloat(rate.rate) / 100))

            configurableChild.specialPriceInclTax = (parseFloat(configurableChild.special_price) + parseFloat(configurableChild.special_price) * (parseFloat(rate.rate) / 100))
            configurableChild.specialPriceTax = (parseFloat(configurableChild.special_price) * (parseFloat(rate.rate) / 100))

            if (configurableChild.special_price) {
              configurableChild.originalPrice = parseFloat(configurableChild.price)
              configurableChild.originalPriceInclTax = configurableChild.priceInclTax
              configurableChild.originalPriceTax = configurableChild.priceTax

              configurableChild.price = parseFloat(configurableChild.special_price)
              configurableChild.priceInclTax = configurableChild.specialPriceInclTax
              configurableChild.priceTax = configurableChild.specialPriceTax
            } else {
              configurableChild.special_price = 0
            }

            if (configurableChild.priceInclTax < product.priceInclTax || product.price === 0) { // always show the lowest price
              product.priceInclTax = parseFloat(configurableChild.priceInclTax)
              product.priceTax = parseFloat(configurableChild.priceTax)
              product.price = parseFloat(configurableChild.price)
              product.special_price = parseFloat(configurableChild.special_price)
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
    if (config.tax.calculateServerSide) {
      console.log('Taxes calculated server side, skipping')
      resolve(products)
    } else {
      store.dispatch('tax/list', { query: '' }, { root: true }).then((tcs) => { // TODO: move it to the server side for one requests OR cache in indexedDb
        for (let product of products) {
          product = calculateProductTax(product, tcs)
        }
        resolve(products)
      })
    }
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

function configureProductAsync (context, { product, configuration, selectDefaultVariant = true }) {
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
    if (selectDefaultVariant) {
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
   * Setup product breadcrumbs path
   */
  setupBreadcrumbs (context, { product }) {
    let subloaders = []
    let setbrcmb = (path) => {
      if (path.findIndex(itm => {
        return itm.slug === context.rootState.category.current.slug
      }) < 0) {
        path.push({
          slug: context.rootState.category.current.slug,
          name: context.rootState.category.current.name
        }) // current category at the end
      }
      context.dispatch('meta/set', { title: product.name }, { root: true })
      context.state.breadcrumbs.routes = breadCrumbRoutes(path) // TODO: change to store.commit call?
    }
    // TODO: Fix it when product is enterd from outside the category page
    let currentPath = context.rootState.category.current_path
    let currentCat = context.rootState.category.current

    if (currentPath.length > 0 && currentCat) {
      setbrcmb(currentPath)
    } else {
      if (product.category && product.category.length > 0) {
        subloaders.push(
          context.dispatch('category/list', {}, { root: true }).then((categories) => {
            for (let cat of product.category.reverse()) {
              let category = categories.items.find((itm) => { return itm['id'] === cat.category_id })
              if (category) {
                context.dispatch('category/single', { key: 'id', value: category.id }, { root: true }).then((category) => { // this sets up category path and current category
                  setbrcmb(context.rootState.category.current_path)
                }).catch(err => {
                  setbrcmb(context.rootState.category.current_path)
                  console.error(err)
                })
                break
              }
            }
          }, { root: true }).catch(err => {
            console.error(err)
          })
        )
      }
    }
    context.state.breadcrumbs.name = product.name

    return Promise.all(subloaders)
  },

  /**
   * Setup associated products
   */
  setupAssociated (context, { product }) {
    let subloaders = []
    if (product.type_id === 'grouped') {
      product.price = 0
      product.priceInclTax = 0
      console.log(product.name + ' SETUP ASSOCIATED')
      for (let pl of product.product_links) {
        if (pl.link_type === 'associated' && pl.linked_product_type === 'simple') { // prefetch links
          console.log('Prefetching grouped product link for ' + pl.sku + ' = ' + pl.linked_product_sku)
          context.dispatch('single', {
            options: { sku: pl.linked_product_sku },
            setCurrentProduct: false,
            selectDefaultVariant: false
          }).catch(err => { console.log('err'); console.error(err) }).then((asocProd) => {
            pl.product = asocProd
            pl.product.qty = 1
            product.price += pl.product.price
            product.priceInclTax += pl.product.priceInclTax
            product.tax += pl.product.tax
          })
        }
      }
    }
    return Promise.all(subloaders)
  },

  /**
   * Setup product current variants
   */
  setupVariants (context, { product }) {
    let subloaders = []
    if (product.type_id === 'configurable') {
      const configurableAttrIds = product.configurable_options.map(opt => opt.attribute_id)
      subloaders.push(context.dispatch('attribute/list', {
        filterValues: configurableAttrIds,
        filterField: 'attribute_id'
      }, { root: true }).then((attributes) => {
        for (let option of product.configurable_options) {
          for (let ov of option.values) {
            let lb = optionLabel(context.rootState.attribute, { attributeKey: option.attribute_id, searchBy: 'id', optionId: ov.value_index })
            context.state.current_options[option.label.toLowerCase()].push({
              label: lb,
              id: ov.value_index
            })
          }
        }
        // todo: this doesn't populate product.current_configuration
        let selectedVariant = context.state.current
        for (let option of product.configurable_options) {
          let attr = context.rootState.attribute.list_by_id[option.attribute_id]
          if (selectedVariant.custom_attributes) {
            let selectedOption = selectedVariant.custom_attributes.find((a) => {
              return (a.attribute_code === attr.attribute_code)
            })
            context.state.current_configuration[attr.attribute_code] = {
              attribute_code: attr.attribute_code,
              id: selectedOption.value,
              label: optionLabel(context.rootState.attribute, { attributeKey: selectedOption.attribute_code, searchBy: 'code', optionId: selectedOption.value })
            }
          }
        }
      }).catch(err => {
        console.error(err)
      }))
    }
    return Promise.all(subloaders)
  },
  /**
   * Search ElasticSearch catalog of products using simple text query
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   * @param {Object} query elasticSearch request body
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  list (context, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', prefetchGroupProducts = true, updateState = true }) {
    return quickSearchByQuery({ query, start, size, entityType, sort }).then((resp) => {
      return calculateTaxes(resp.items, context).then((updatedProducts) => {
        // handle cache
        const cache = global.db.elasticCacheCollection
        for (let prod of resp.items) { // we store each product separately in cache to have offline access to products/single method
          if (!prod[cacheByKey]) {
            cacheByKey = 'id'
          }
          const cacheKey = entityKeyName(cacheByKey, prod[cacheByKey])
          cache.setItem(cacheKey, prod)
            .catch((err) => {
              console.error('Cannot store cache for ' + cacheKey + ', ' + err)
            })
          if (prod.type_id === 'grouped' && prefetchGroupProducts) {
            context.dispatch('setupAssociated', { product: prod })
          }
        }
        // commit update products list mutation
        if (updateState) {
          context.commit(types.CATALOG_UPD_PRODUCTS, resp)
        }
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
  single (context, { options, setCurrentProduct = true, selectDefaultVariant = true, key = 'sku' }) {
    if (!options[key]) {
      throw Error('Please provide the search key ' + key + ' for product/single action!')
    }
    const cacheKey = entityKeyName(key, options[key])

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
          if (setCurrentProduct) {
            context.dispatch('setOriginal', prod)
          }
          // check is prod has configurable children
          const hasConfigurableChildren = prod && prod.configurable_children && prod.configurable_children.length
          // set current product - configurable or not
          if (prod.type_id === 'configurable' && hasConfigurableChildren) {
            // set first available configuration
            // todo: probably a good idea is to change this [0] to specific id
            configureProductAsync(context, { product: prod, configuration: { sku: options.childSku }, selectDefaultVariant: selectDefaultVariant })
          } else {
            if (setCurrentProduct) context.dispatch('setCurrent', prod)
          }
          return prod
        }
        if (res !== null) {
          console.debug('Product:single - result from localForage for ' + cacheKey + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
          resolve(setupProduct(res))
        } else {
          context.dispatch('list', {
            query: bodybuilder()
              .query('match', key, options[key])
              .build(),
            prefetchGroupProducts: false
          }).then((res) => {
            if (res && res.items && res.items.length) {
              resolve(setupProduct(res.items[0]))
            } else {
              reject(Error('Product query returned empty result'))
            }
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
  configure (context, { product = null, configuration, selectDefaultVariant = true }) {
    return configureProductAsync(context, { product: product, configuration: configuration, selectDefaultVariant: selectDefaultVariant })
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
