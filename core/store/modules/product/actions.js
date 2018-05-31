import config from '../../lib/config'
import * as types from '../../mutation-types'
import { breadCrumbRoutes, productThumbnailPath } from '../../helpers'
import { currentStoreView } from '../../lib/multistore'
import { configureProductAsync, doPlatformPricesSync, filterOutUnavailableVariants, calculateTaxes, populateProductConfigurationAsync, setCustomProductOptionsAsync, setBundleProductOptionsAsync } from './helpers'
import bodybuilder from 'bodybuilder'
import { entityKeyName } from '../../lib/entities'
import { optionLabel } from '../attribute/helpers'
import { quickSearchByQuery } from '../../lib/search'
import EventBus from '../../lib/event-bus'
import omit from 'lodash-es/omit'
import trim from 'lodash-es/trim'
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
    const storeView = currentStoreView()
    return context.dispatch('sync/execute', { url: config.products.endpoint + '/render-list?skus=' + encodeURIComponent(skus.join(',') + '&currencyCode=' + encodeURIComponent(storeView.i18n.currencyCode)), // sync the cart
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
      console.debug(product.name + ' SETUP ASSOCIATED', product.type_id)
      if (product.product_links && product.product_links.length > 0) {
        for (let pl of product.product_links) {
          if (pl.link_type === 'associated' && pl.linked_product_type === 'simple') { // prefetch links
            console.debug('Prefetching grouped product link for ' + pl.sku + ' = ' + pl.linked_product_sku)
            subloaders.push(context.dispatch('single', {
              options: { sku: pl.linked_product_sku },
              setCurrentProduct: false,
              selectDefaultVariant: false
            }).catch(err => { console.error(err) }).then((asocProd) => {
              if (asocProd) {
                pl.product = asocProd
                pl.product.qty = 1
                product.price += pl.product.price
                product.priceInclTax += pl.product.priceInclTax
                product.tax += pl.product.tax
              } else {
                console.error('Product link not found', pl.linked_product_sku)
              }
            }))
          }
        }
      } else {
        console.error('Product with type grouped has no product_links set!', product)
      }
    }
    if (product.type_id === 'bundle') {
      product.price = 0
      product.priceInclTax = 0
      console.debug(product.name + ' SETUP ASSOCIATED', product.type_id)
      if (product.bundle_options && product.bundle_options.length > 0) {
        for (let bo of product.bundle_options) {
          let defaultOption = bo.product_links.find((p) => { return p.is_default })
          if (!defaultOption) defaultOption = bo.product_links[0]
          for (let pl of bo.product_links) {
            console.debug('Prefetching bundle product link for ' + bo.sku + ' = ' + pl.sku)
            subloaders.push(context.dispatch('single', {
              options: { sku: pl.sku },
              setCurrentProduct: false,
              selectDefaultVariant: false
            }).catch(err => { console.error(err) }).then((asocProd) => {
              if (asocProd) {
                pl.product = asocProd
                pl.product.qty = pl.qty
                if (pl.id === defaultOption.id) {
                  product.price += pl.product.price
                  product.priceInclTax += pl.product.priceInclTax
                  product.tax += pl.product.tax
                }
              } else {
                console.error('Product link not found', pl.sku)
              }
            }))
          }
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
            if (trim(lb) !== '') {
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
        populateProductConfigurationAsync(context, { selectedVariant: selectedVariant, product: product })
      }).catch(err => {
        console.error(err)
      }))
    }
    return Promise.all(subloaders)
  },
  filterUnavailableVariants (context, { product }) {
    return filterOutUnavailableVariants(context, product)
  },
  /**
   * Search ElasticSearch catalog of products using simple text query
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   * @param {Object} query elasticSearch request body
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  list (context, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', prefetchGroupProducts = true, updateState = false, meta = {}, excludeFields = null, includeFields = null, configuration = null, append = false }) {
    let isCacheable = (includeFields === null && excludeFields === null)
    if (isCacheable) {
      console.debug('Entity cache is enabled for productList')
    } else {
      console.debug('Entity cache is disabled for productList')
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
      if (resp.items && resp.items.length) { // preconfigure products; eg: after filters
        for (let product of resp.items) {
          product.errors = {} // this is an object to store validation result for custom options and others
          product.info = {}
          product.parentSku = product.sku
          if (configuration) {
            let selectedVariant = configureProductAsync(context, { product: product, configuration: configuration, selectDefaultVariant: false })
            Object.assign(product, selectedVariant)
          }
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
          if ((prod.type_id === 'grouped' || prod.type_id === 'bundle') && prefetchGroupProducts) {
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
            prod = omit(prod, ['configurable_children', 'configurable_options'])
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
          const _returnProductFromCacheHelper = (subresults) => {
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
          }
          if (setCurrentProduct || selectDefaultVariant) {
            context.dispatch('setupVariants', { product: res }).then(_returnProductFromCacheHelper)
          } else {
            _returnProductFromCacheHelper(null)
          }
        } else {
          context.dispatch('list', { // product list syncs the platform price on it's own
            query: bodybuilder()
              .query('match', key, options[key])
              .build(),
            prefetchGroupProducts: false,
            updateState: false
          }).then((res) => {
            if (res && res.items && res.items.length) {
              let prd = res.items[0]
              const _returnProductNoCacheHelper = (subresults) => {
                if (EventBus.$emitFilter) EventBus.$emitFilter('product-after-single', { key: key, options: options, product: prd })
                resolve(setupProduct(prd))
              }
              if (setCurrentProduct || selectDefaultVariant) {
                context.dispatch('setupVariants', { product: prd }).then(_returnProductNoCacheHelper)
              } else {
                _returnProductNoCacheHelper(null)
              }
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
  configure (context, { product = null, configuration, selectDefaultVariant = true, fallbackToDefaultWhenNoAvailable = true }) {
    return configureProductAsync(context, { product: product, configuration: configuration, selectDefaultVariant: selectDefaultVariant, fallbackToDefaultWhenNoAvailable: fallbackToDefaultWhenNoAvailable })
  },

  setCurrentOption (context, productOption) {
    if (productOption && typeof productOption === 'object') { // TODO: this causes some kind of recurrency error
      context.commit(types.CATALOG_SET_PRODUCT_CURRENT, Object.assign({}, context.state.current, { product_option: productOption }))
    }
  },

  /**
   * Assign the custom options object to the currentl product
   */
  setCustomOptions (context, { customOptions, product }) {
    if (customOptions) { // TODO: this causes some kind of recurrency error
      context.commit(types.CATALOG_SET_PRODUCT_CURRENT, Object.assign({}, product, { product_option: setCustomProductOptionsAsync(context, { product: context.state.current, customOptions: customOptions }) }))
    }
  },
  /**
   * Assign the bundle options object to the vurrent product
   */
  setBundleOptions (context, { bundleOptions, product }) {
    if (bundleOptions) { // TODO: this causes some kind of recurrency error
      context.commit(types.CATALOG_SET_PRODUCT_CURRENT, Object.assign({}, product, { product_option: setBundleProductOptionsAsync(context, { product: context.state.current, bundleOptions: bundleOptions }) }))
    }
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
        console.debug('Image offline fallback set to ', context.state.offlineImage)
      }
      // check if passed variant is the same as original
      const productUpdated = Object.assign({}, productOriginal, productVariant)
      populateProductConfigurationAsync(context, { product: productUpdated, selectedVariant: productVariant })
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
        if (global.$VS.isSSR) {
          subloaders.push(context.dispatch('filterUnavailableVariants', { product: product }))
        } else {
          context.dispatch('filterUnavailableVariants', { product: product }) // exec async
        }
        subloaders.push(context.dispatch('setupBreadcrumbs', { product: product }))

        // subloaders.push(context.dispatch('setupVariants', { product: product })) -- moved to "product/single"
        if (product.type_id === 'grouped' || product.type_id === 'bundle') {
          subloaders.push(context.dispatch('setupAssociated', { product: product }).then((subloaderresults) => {
            context.dispatch('setCurrent', product) // because setup Associated can modify the product price we need to update the current product
          }))
        }

        if (config.products.preventConfigurableChildrenDirectAccess) {
          subloaders.push(context.dispatch('checkConfigurableParent', { product: product }))
        }
      } else { // error or redirect

      }
      return subloaders
    })
  },
  /**
   * Add custom option validator for product custom options
   */
  addCustomOptionValidator (context, { validationRule, validatorFunction }) {
    context.commit(types.CATALOG_ADD_CUSTOM_OPTION_VALIDATOR, { validationRule, validatorFunction })
  },
  /**
   * Load the product data - async version for asyncData()
   */
  fetchAsync (context, { parentSku, childSku = null, route = null }) {
    return new Promise((resolve, reject) => {
      console.log('Entering fetchAsync for Product root ' + new Date(), parentSku, childSku)
      EventBus.$emit('product-before-load', { store: rootStore, route: route })
      context.dispatch('reset').then(() => {
        rootStore.dispatch('attribute/list', { // load attributes to be shown on the product details
          filterValues: [true],
          filterField: 'is_user_defined',
          includeFields: config.entities.optimize ? config.entities.attribute.includeFields : null
        }).then((attrs) => {
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
          }).catch(err => {
            console.error(err)
            reject(err)
          })
        })
      })
    })
  }
}
