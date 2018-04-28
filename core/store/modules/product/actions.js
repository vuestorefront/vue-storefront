import config from '../../lib/config'
import * as types from '../../mutation-types'
import { breadCrumbRoutes, productThumbnailPath } from '../../helpers'
import { configureProductAsync, doPlatformPricesSync, calculateTaxes } from './helpers'
import bodybuilder from 'bodybuilder'
import { entityKeyName } from '../../lib/entities'
import { optionLabel } from '../attribute/helpers'
import { quickSearchByQuery } from '../../lib/search'
import EventBus from '../../lib/event-bus'
import _ from 'lodash'
import rootStore from '../../'

export default {
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
  doPlatformPricesSync (context, { products }) {
    return doPlatformPricesSync(products)
  },
  /**
   * Download Magento2 / other platform prices to put them over ElasticSearch prices
   */
  syncPlatformPricesOver (context, { skus }) {
    return context.dispatch('sync/execute', { url: config.products.endpoint + '/render-list?skus=' + encodeURIComponent(skus.join(',') + '&currencyCode=' + encodeURIComponent(config.i18n.currencyCode)), // sync the cart
      payload: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      },
      callback_event: 'prices-after-sync'
    }, { root: true }).then(task => {
      return task.result
    })
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
          subloaders.push(context.dispatch('single', {
            options: { sku: pl.linked_product_sku },
            setCurrentProduct: false,
            selectDefaultVariant: false
          }).catch(err => { console.error(err) }).then((asocProd) => {
            pl.product = asocProd
            pl.product.qty = 1
            product.price += pl.product.price
            product.priceInclTax += pl.product.priceInclTax
            product.tax += pl.product.tax
          }))
        }
      }
    }
    return Promise.all(subloaders)
  },
  /**
   * This is fix for https://github.com/DivanteLtd/vue-storefront/issues/508
   * TODO: probably it would be better to have "parent_id" for simple products or to just ensure configurable variants are not visible in categories/search
   */
  checkConfigurableParent (context, {product}) {
    if (product.type_id === 'simple') {
      console.log('Checking configurable parent')
      let query = bodybuilder()
        .query('match', 'configurable_children.sku', context.state.current.sku)
        .build()

      return context.dispatch('list', {query, start: 0, size: 1, updateState: false}).then((resp) => {
        if (resp.items.length >= 1) {
          const parentProduct = resp.items[0]
          context.commit(types.CATALOG_SET_PRODUCT_PARENT, parentProduct)
        }
      }).catch(function (err) {
        console.error(err)
      })
    }
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
            if (_.trim(lb) !== '') {
              let optionKey = option.attribute_code ? option.attribute_code : option.label.toLowerCase()
              if (!context.state.current_options[optionKey]) {
                context.state.current_options[optionKey] = []
              }
              context.state.current_options[optionKey].push({
                label: lb,
                id: ov.value_index
              })
            }
          }
        }
        let selectedVariant = context.state.current
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
  list (context, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', prefetchGroupProducts = true, updateState = true, meta = {}, excludeFields = null, includeFields = null, configuration = null, append = false }) {
    let isCacheable = (includeFields === null && excludeFields === null)
    if (isCacheable) {
      console.log('Entity cache is enabled for productList')
    } else {
      console.log('Entity cache is disabled for productList')
    }

    if (config.entities.optimize) {
      if (excludeFields === null) { // if not set explicitly we do optimize the amount of data by using some default field list; this is cacheable
        excludeFields = config.entities.product.excludeFields
      }
      if (includeFields === null) { // if not set explicitly we do optimize the amount of data by using some default field list; this is cacheable
        includeFields = config.entities.product.includeFields
      }
    }
    return quickSearchByQuery({ query, start, size, entityType, sort, excludeFields, includeFields }).then((resp) => {
      if (resp.items && resp.items.length && configuration) { // preconfigure products; eg: after filters
        for (let product of resp.items) {
          let selectedVariant = configureProductAsync(context, { product: product, configuration: configuration, selectDefaultVariant: false })
          product.parentSku = product.sku
          Object.assign(product, selectedVariant)
        }
      }
      return calculateTaxes(resp.items, context).then((updatedProducts) => {
        // handle cache
        const cache = global.$VS.db.elasticCacheCollection
        for (let prod of resp.items) { // we store each product separately in cache to have offline access to products/single method
          if (prod.configurable_children) {
            for (let configurableChild of prod.configurable_children) {
              if (configurableChild.custom_attributes) {
                for (let opt of configurableChild.custom_attributes) {
                  configurableChild[opt.attribute_code] = opt.value
                }
              }
            }
          }

          if (!prod[cacheByKey]) {
            cacheByKey = 'id'
          }
          const cacheKey = entityKeyName(cacheByKey, prod[cacheByKey])
          if (isCacheable) { // store cache only for full loads
            cache.setItem(cacheKey, prod)
              .catch((err) => {
                console.error('Cannot store cache for ' + cacheKey, err)
              })
          }
          if (prod.type_id === 'grouped' && prefetchGroupProducts) {
            context.dispatch('setupAssociated', { product: prod })
          }
        }
        // commit update products list mutation
        if (updateState) {
          context.commit(types.CATALOG_UPD_PRODUCTS, { products: resp, append: append })
        }
        EventBus.$emit('product-after-list', { query: query, start: start, size: size, sort: sort, entityType: entityType, meta: meta, result: resp })
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
      const cache = global.$VS.db.elasticCacheCollection
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
          if (prod.type_id === 'simple' && hasConfigurableChildren) { // workaround for #983
            prod = _.omit(prod, ['configurable_children', 'configurable_options'])
          }
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
          console.debug('Product:single - result from localForage (for ' + cacheKey + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))

          const cachedProduct = setupProduct(res)
          if (config.products.alwaysSyncPlatformPricesOver) {
            doPlatformPricesSync([cachedProduct]).then((products) => {
              if (EventBus.$emitFilter) EventBus.$emitFilter('product-after-single', { key: key, options: options, product: products[0] })
              resolve(products[0])
            })
            if (!config.products.waitForPlatformSync) {
              if (EventBus.$emitFilter) EventBus.$emitFilter('product-after-single', { key: key, options: options, product: cachedProduct })
              resolve(cachedProduct)
            }
          } else {
            if (EventBus.$emitFilter) EventBus.$emitFilter('product-after-single', { key: key, options: options, product: cachedProduct })
            resolve(cachedProduct)
          }
        } else {
          context.dispatch('list', { // product list syncs the platform price on it's own
            query: bodybuilder()
              .query('match', key, options[key])
              .build(),
            prefetchGroupProducts: false
          }).then((res) => {
            if (res && res.items && res.items.length) {
              if (EventBus.$emitFilter) EventBus.$emitFilter('product-after-single', { key: key, options: options, product: res.items[0] })
              resolve(setupProduct(res.items[0]))
            } else {
              reject(new Error('Product query returned empty result'))
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

      if (!context.state.offlineImage) {
        context.state.offlineImage = productThumbnailPath(productOriginal, true)
        console.log('Image offline fallback set to ', context.state.offlineImage)
      }
      // check if passed variant is the same as original
      const productUpdated = Object.assign({}, productOriginal, productVariant)
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
  },

  /**
   * Load the product data
   */
  fetch (context, { parentSku, childSku = null }) {
    // pass both id and sku to render a product
    const productSingleOptions = {
      sku: parentSku,
      childSku: childSku
    }
    return context.dispatch('single', { options: productSingleOptions }).then((product) => {
      let subloaders = []
      if (product) {
        subloaders.push(context.dispatch('setupBreadcrumbs', { product: product }))

        subloaders.push(rootStore.dispatch('attribute/list', { // load attributes to be shown on the product details
          filterValues: [true],
          filterField: 'is_user_defined',
          includeFields: config.entities.optimize ? config.entities.attribute.includeFields : null
        }))

        subloaders.push(context.dispatch('setupVariants', { product: product }))
        subloaders.push(context.dispatch('setupAssociated', { product: product }))

        if (config.products.preventConfigurableChildrenDirectAccess) {
          subloaders.push(context.dispatch('checkConfigurableParent', { product: product }))
        }
      } else { // error or redirect

      }
      return subloaders
    })
  },
  /**
   * Load the product data - async version for asyncData()
   */
  fetchAsync (context, { parentSku, childSku = null, route = null }) {
    return new Promise((resolve, reject) => {
      console.log('Entering fetchAsync for Product root ' + new Date(), parentSku, childSku)
      EventBus.$emit('product-before-load', { store: rootStore, route: route })
      context.dispatch('reset').then(() => {
        context.dispatch('fetch', { parentSku: parentSku, childSku: childSku }).then((subpromises) => {
          Promise.all(subpromises).then(subresults => {
            EventBus.$emitFilter('product-after-load', { store: rootStore, route: route }).then((results) => {
              return resolve()
            }).catch((err) => {
              console.error(err)
              return resolve()
            })
          }).catch(errs => {
            console.error(errs)
            return resolve()
          })
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    })
  }

}
