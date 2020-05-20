import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { formatBreadCrumbRoutes, isServer } from '@vue-storefront/core/helpers'
import { currentStoreView, localizedDispatcherRoute, localizedDispatcherRouteName } from '@vue-storefront/core/lib/multistore'
import { configureProductAsync,
  doPlatformPricesSync,
  filterOutUnavailableVariants,
  populateProductConfigurationAsync,
  setCustomProductOptionsAsync,
  setBundleProductOptionsAsync,
  getMediaGallery,
  configurableChildrenImages,
  attributeImages } from '../../helpers'
import { preConfigureProduct, getOptimizedFields, configureChildren, storeProductToCache, canCache, isGroupedOrBundle } from '@vue-storefront/core/modules/catalog/helpers/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import { optionLabel } from '../../helpers/optionLabel'
import { isOnline } from '@vue-storefront/core/lib/search'
import omit from 'lodash-es/omit'
import trim from 'lodash-es/trim'
import cloneDeep from 'lodash-es/cloneDeep'
import uniqBy from 'lodash-es/uniqBy'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'
import { Logger } from '@vue-storefront/core/lib/logger';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import toString from 'lodash-es/toString'
import config from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { formatProductLink } from 'core/modules/url/helpers'
import { checkParentRedirection } from '@vue-storefront/core/modules/catalog/events'

const PRODUCT_REENTER_TIMEOUT = 20000

const actions: ActionTree<ProductState, RootState> = {
  /**
   * Reset current configuration and selected variatnts
   */
  reset (context) {
    const originalProduct = Object.assign({}, context.getters.getOriginalProduct)
    context.commit(types.PRODUCT_RESET_CURRENT, originalProduct)
  },
  /**
   * Setup product breadcrumbs path
   */
  async setupBreadcrumbs (context, { product }) {
    console.warn('deprecated, will be removed in 1.13')
    let breadcrumbsName = null
    let setBreadcrumbRoutesFromPath = (path) => {
      if (path.findIndex(itm => {
        return itm.slug === context.rootGetters['category/getCurrentCategory'].slug
      }) < 0) {
        path.push({
          url_path: context.rootGetters['category/getCurrentCategory'].url_path,
          slug: context.rootGetters['category/getCurrentCategory'].slug,
          name: context.rootGetters['category/getCurrentCategory'].name
        }) // current category at the end
      }
      // deprecated, TODO: base on breadcrumbs module
      breadcrumbsName = product.name
      const breadcrumbs = {
        routes: formatBreadCrumbRoutes(path),
        current: breadcrumbsName,
        name: breadcrumbsName
      }
      context.commit(types.CATALOG_SET_BREADCRUMBS, breadcrumbs)
    }

    if (product.category && product.category.length > 0) {
      const categoryIds = product.category.reverse().map(cat => cat.category_id)
      await context.dispatch('category/list', { key: 'id', value: categoryIds }, { root: true }).then(async (categories) => {
        const catList = []

        for (let catId of categoryIds) {
          let category = categories.items.find((itm) => { return toString(itm['id']) === toString(catId) })
          if (category) {
            catList.push(category)
          }
        }

        const rootCat = catList.shift()
        let catForBreadcrumbs = rootCat

        for (let cat of catList) {
          const catPath = cat.path
          if (catPath && catPath.includes(rootCat.path) && (catPath.split('/').length > catForBreadcrumbs.path.split('/').length)) {
            catForBreadcrumbs = cat
          }
        }
        if (typeof catForBreadcrumbs !== 'undefined') {
          await context.dispatch('category/single', { key: 'id', value: catForBreadcrumbs.id }, { root: true }).then(() => { // this sets up category path and current category
            setBreadcrumbRoutesFromPath(context.rootGetters['category/getCurrentCategoryPath'])
          }).catch(err => {
            setBreadcrumbRoutesFromPath(context.rootGetters['category/getCurrentCategoryPath'])
            Logger.error(err)()
          })
        } else {
          setBreadcrumbRoutesFromPath(context.rootGetters['category/getCurrentCategoryPath'])
        }
      })
    }
  },
  doPlatformPricesSync (context, { products }) {
    return doPlatformPricesSync(products)
  },
  /**
   * Download Magento2 / other platform prices to put them over ElasticSearch prices
   */
  syncPlatformPricesOver ({ rootGetters }, { skus }) {
    const storeView = currentStoreView()
    let url = `${config.products.endpoint}/render-list?skus=${encodeURIComponent(skus.join(','))}&currencyCode=${encodeURIComponent(storeView.i18n.currencyCode)}&storeId=${encodeURIComponent(storeView.storeId)}`
    if (rootGetters['tax/getIsUserGroupedTaxActive']) {
      url = `${url}&userGroupId=${rootGetters['tax/getUserTaxGroupId']}`
    }

    return TaskQueue.execute({ url, // sync the cart
      payload: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      },
      callback_event: 'prices-after-sync'
    }).then((task: any) => {
      return task.result
    })
  },
  /**
   * Setup associated products
   */
  setupAssociated (context, { product, skipCache = true }) {
    let subloaders = []
    if (product.type_id === 'grouped') {
      product.price = 0
      product.price_incl_tax = 0
      Logger.debug(product.name + ' SETUP ASSOCIATED', product.type_id)()
      if (product.product_links && product.product_links.length > 0) {
        for (let pl of product.product_links) {
          if (pl.link_type === 'associated' && pl.linked_product_type === 'simple') { // prefetch links
            Logger.debug('Prefetching grouped product link for ' + pl.sku + ' = ' + pl.linked_product_sku)()
            subloaders.push(context.dispatch('single', {
              options: { sku: pl.linked_product_sku },
              setCurrentProduct: false,
              selectDefaultVariant: false,
              skipCache: skipCache
            }).catch(err => { Logger.error(err) }).then((asocProd) => {
              if (asocProd) {
                pl.product = asocProd
                pl.product.qty = 1
                product.price += pl.product.price
                product.price_incl_tax += pl.product.price_incl_tax
                product.tax += pl.product.tax
              } else {
                Logger.error('Product link not found', pl.linked_product_sku)()
              }
            }))
          }
        }
      } else {
        Logger.error('Product with type grouped has no product_links set!', product)()
      }
    }
    if (product.type_id === 'bundle') {
      product.price = 0
      product.price_incl_tax = 0
      Logger.debug(product.name + ' SETUP ASSOCIATED', product.type_id)()
      if (product.bundle_options && product.bundle_options.length > 0) {
        for (let bo of product.bundle_options) {
          let defaultOption = bo.product_links.find((p) => { return p.is_default })
          if (!defaultOption) defaultOption = bo.product_links[0]
          for (let pl of bo.product_links) {
            Logger.debug('Prefetching bundle product link for ' + bo.sku + ' = ' + pl.sku)()
            subloaders.push(context.dispatch('single', {
              options: { sku: pl.sku },
              setCurrentProduct: false,
              selectDefaultVariant: false,
              skipCache: skipCache
            }).catch(err => { Logger.error(err) }).then((asocProd) => {
              if (asocProd) {
                pl.product = asocProd
                pl.product.qty = pl.qty

                if (pl.id === defaultOption.id) {
                  product.price += pl.product.price * pl.product.qty
                  product.price_incl_tax += pl.product.price_incl_tax * pl.product.qty
                  product.tax += pl.product.tax * pl.product.qty
                }
              } else {
                Logger.error('Product link not found', pl.sku)()
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
  checkConfigurableParent (context, { product }) {
    if (product.type_id === 'simple') {
      Logger.log('Checking configurable parent')()

      let searchQuery = new SearchQuery()
      searchQuery = searchQuery.applyFilter({ key: 'configurable_children.sku', value: { 'eq': context.getters.getCurrentProduct.sku } })

      return context.dispatch('list', { query: searchQuery, start: 0, size: 1, updateState: false }).then((resp) => {
        if (resp.items.length >= 1) {
          const parentProduct = resp.items[0]
          context.commit(types.PRODUCT_SET_PARENT, parentProduct)
        }
      }).catch((err) => {
        Logger.error(err)()
      })
    }
  },
  /**
   * Load required configurable attributes
   * @param context
   * @param product
   */
  loadConfigurableAttributes (context, { product }) {
    let attributeKey = 'attribute_id'
    const configurableAttrKeys = product.configurable_options.map(opt => {
      if (opt.attribute_id) {
        attributeKey = 'attribute_id'
        return opt.attribute_id
      } else {
        attributeKey = 'attribute_code'
        return opt.attribute_code
      }
    })
    return context.dispatch('attribute/list', {
      filterValues: configurableAttrKeys,
      filterField: attributeKey
    }, { root: true })
  },
  /**
   * Setup product current variants
   */
  setupVariants (context, { product }) {
    let subloaders = []
    if (product.type_id === 'configurable' && product.hasOwnProperty('configurable_options')) {
      subloaders.push(context.dispatch('product/loadConfigurableAttributes', { product }, { root: true }).then((attributes) => {
        let productOptions = {}
        for (let option of product.configurable_options) {
          for (let ov of option.values) {
            let lb = ov.label ? ov.label : optionLabel(context.rootState.attribute, { attributeKey: option.attribute_id, searchBy: 'id', optionId: ov.value_index })
            if (trim(lb) !== '') {
              let optionKey = option.attribute_code ? option.attribute_code : option.label.toLowerCase()
              if (!productOptions[optionKey]) {
                productOptions[optionKey] = []
              }
              productOptions[optionKey].push({
                label: lb,
                id: ov.value_index,
                attribute_code: option.attribute_code
              })
            }
          }
        }
        context.commit(types.PRODUCT_SET_CURRENT_OPTIONS, productOptions)
        let selectedVariant = context.getters.getCurrentProduct
        populateProductConfigurationAsync(context, { selectedVariant: selectedVariant, product: product })
      }).catch(err => {
        Logger.error(err)()
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
   * @param {Object} query is the object of searchQuery class
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  async list ({ dispatch, commit }, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', prefetchGroupProducts = !isServer, updateState = false, meta = {}, excludeFields = null, includeFields = null, configuration = null, append = false, populateRequestCacheTags = true }) {
    const searchResult = await dispatch('findProducts', { query, start, size, entityType, sort, cacheByKey, excludeFields, includeFields, configuration, populateRequestCacheTags })
    await dispatch('preConfigureAssociated', { searchResult, prefetchGroupProducts })

    if (updateState) {
      if (append) commit(types.PRODUCT_ADD_PAGED_PRODUCTS, searchResult)
      else commit(types.PRODUCT_SET_PAGED_PRODUCTS, searchResult)
    }

    EventBus.$emit('product-after-list', { query, start, size, sort, entityType, meta, result: searchResult })

    return searchResult
  },
  preConfigureAssociated (context, { searchResult, prefetchGroupProducts }) {
    const { storeCode, appendStoreCode } = currentStoreView()
    for (let product of searchResult.items) {
      if (product.url_path) {
        const { parentSku, slug } = product

        context.dispatch('url/registerMapping', {
          url: localizedDispatcherRoute(product.url_path, storeCode),
          routeData: {
            params: { parentSku, slug },
            'name': localizedDispatcherRouteName(product.type_id + '-product', storeCode, appendStoreCode)
          }
        }, { root: true })
      }

      if (isGroupedOrBundle(product) && prefetchGroupProducts && !isServer) {
        context.dispatch('setupAssociated', { product })
      }
    }
  },
  preConfigureProduct (context, { product, populateRequestCacheTags, configuration }) {
    console.warn('deprecated, will be removed in 1.13')
    let prod = preConfigureProduct({ product, populateRequestCacheTags })

    if (configuration) {
      const selectedVariant = configureProductAsync(context, { product: prod, selectDefaultVariant: false, configuration })
      prod = Object.assign({}, prod, omit(selectedVariant, ['visibility']))
    }

    return prod
  },
  async configureLoadedProducts (context, { products, isCacheable, cacheByKey, populateRequestCacheTags, configuration }) {
    const configuredProducts = await context.dispatch(
      'category-next/configureProducts',
      {
        products: products.items,
        filters: configuration || {},
        populateRequestCacheTags
      },
      { root: true }
    )

    await context.dispatch('tax/calculateTaxes', { products: configuredProducts }, { root: true })

    for (let product of configuredProducts) { // we store each product separately in cache to have offline access to products/single method
      if (isCacheable) { // store cache only for full loads
        storeProductToCache(product, cacheByKey)
      }
    }

    return products
  },
  async findProducts (context, { query, start = 0, size = 50, entityType = 'product', sort = '', cacheByKey = 'sku', excludeFields = null, includeFields = null, configuration = null, populateRequestCacheTags = true }) {
    const isCacheable = canCache({ includeFields, excludeFields })
    const { excluded, included } = getOptimizedFields({ excludeFields, includeFields })
    const resp = await quickSearchByQuery({ query, start, size, entityType, sort, excludeFields: excluded, includeFields: included })
    const products = await context.dispatch('configureLoadedProducts', { products: resp, isCacheable, cacheByKey, populateRequestCacheTags, configuration })

    return products
  },
  async findConfigurableParent (context, { product, configuration }) {
    const searchQuery = new SearchQuery()
    const query = searchQuery.applyFilter({ key: 'configurable_children.sku', value: { 'eq': product.sku } })
    const products = await context.dispatch('findProducts', { query, configuration })
    return products.items && products.items.length > 0 ? products.items[0] : null
  },
  /**
   * Update associated products for bundle product
   * @param context
   * @param product
   */
  configureBundleAsync (context, product) {
    return context.dispatch(
      'setupAssociated', {
        product: product,
        skipCache: true
      })
      .then(() => { context.dispatch('setCurrent', product) })
      .then(() => { EventBus.$emit('product-after-setup-associated') })
  },

  /**
   * Update associated products for group product
   * @param context
   * @param product
   */
  configureGroupedAsync (context, product) {
    return context.dispatch(
      'setupAssociated', {
        product: product,
        skipCache: true
      })
      .then(() => { context.dispatch('setCurrent', product) })
  },

  /**
   * Search products by specific field
   * @param {Object} options
   */
  async single (context, { options, setCurrentProduct = true, selectDefaultVariant = true, assignDefaultVariant = false, key = 'sku', skipCache = false }) {
    if (!options[key]) {
      throw Error('Please provide the search key ' + key + ' for product/single action!')
    }
    const cacheKey = entityKeyName(key, options[key])

    return new Promise((resolve, reject) => {
      const benchmarkTime = new Date()
      const cache = StorageManager.get('elasticCache')

      const setupProduct = (prod) => {
        // set product quantity to 1
        if (!prod.qty) {
          prod.qty = 1
        }
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
          const selectedVariant = configureProductAsync(context, { product: prod, configuration: { sku: options.childSku }, selectDefaultVariant: selectDefaultVariant, setProductErorrs: true })
          if (selectedVariant && assignDefaultVariant) {
            prod = Object.assign({}, prod, selectedVariant)
          }
        } else if (!skipCache || (prod.type_id === 'simple' || prod.type_id === 'downloadable')) {
          if (setCurrentProduct) context.dispatch('setCurrent', prod)
        }

        return prod
      }

      const syncProducts = () => {
        let searchQuery = new SearchQuery()
        searchQuery = searchQuery.applyFilter({ key: key, value: { 'eq': options[key] } })

        return context.dispatch('list', { // product list syncs the platform price on it's own
          query: searchQuery,
          prefetchGroupProducts: false,
          updateState: false
        }).then((res) => {
          if (res && res.items && res.items.length) {
            let prd = res.items[0]
            const _returnProductNoCacheHelper = (subresults) => {
              EventBus.$emitFilter('product-after-single', { key: key, options: options, product: prd })
              resolve(setupProduct(prd))
            }
            if (setCurrentProduct || selectDefaultVariant) {
              const subConfigPromises = []
              if (prd.type_id === 'bundle') {
                subConfigPromises.push(context.dispatch('configureBundleAsync', prd))
              }

              if (prd.type_id === 'grouped') {
                subConfigPromises.push(context.dispatch('configureGroupedAsync', prd))
              }
              subConfigPromises.push(context.dispatch('setupVariants', { product: prd }))
              Promise.all(subConfigPromises).then(_returnProductNoCacheHelper)
            } else {
              _returnProductNoCacheHelper(null)
            }
          } else {
            reject(new Error('Product query returned empty result'))
          }
        })
      }

      const getProductFromCache = () => {
        cache.getItem(cacheKey, (err, res) => {
          // report errors
          if (!skipCache && err) {
            Logger.error(err, 'product')()
          }

          if (res !== null) {
            Logger.debug('Product:single - result from localForage (for ' + cacheKey + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()), 'product')()
            const _returnProductFromCacheHelper = (subresults) => {
              const cachedProduct = setupProduct(res)
              if (config.products.alwaysSyncPlatformPricesOver) {
                doPlatformPricesSync([cachedProduct]).then((products) => {
                  EventBus.$emitFilter('product-after-single', { key: key, options: options, product: products[0] })
                  resolve(products[0])
                })
                if (!config.products.waitForPlatformSync) {
                  EventBus.$emitFilter('product-after-single', { key: key, options: options, product: cachedProduct })
                  resolve(cachedProduct)
                }
              } else {
                EventBus.$emitFilter('product-after-single', { key: key, options: options, product: cachedProduct })
                resolve(cachedProduct)
              }
            }
            if (setCurrentProduct || selectDefaultVariant) {
              const subConfigPromises = []
              subConfigPromises.push(context.dispatch('setupVariants', { product: res }))
              if (res.type_id === 'bundle') {
                subConfigPromises.push(context.dispatch('configureBundleAsync', res))
              }
              if (res.type_id === 'grouped') {
                subConfigPromises.push(context.dispatch('configureGroupedAsync', res))
              }
              Promise.all(subConfigPromises).then(_returnProductFromCacheHelper)
            } else {
              _returnProductFromCacheHelper(null)
            }
          } else {
            syncProducts()
          }
        })
      }

      if (!skipCache) {
        getProductFromCache()
      } else {
        if (!isOnline()) {
          skipCache = false;
        }

        syncProducts()
      }
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
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, context.getters.getCurrentProduct, { product_option: productOption }))
    }
  },

  setCurrentErrors (context, errors) {
    if (errors && typeof errors === 'object') {
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, context.getters.getCurrentProduct, { errors: errors }))
    }
  },
  /**
   * Assign the custom options object to the currentl product
   */
  setCustomOptions (context, { customOptions, product }) {
    if (customOptions) { // TODO: this causes some kind of recurrency error
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, product, { product_option: setCustomProductOptionsAsync(context, { product: context.getters.getCurrentProduct, customOptions: customOptions }) }))
    }
  },
  /**
   * Assign the bundle options object to the vurrent product
   */
  setBundleOptions (context, { bundleOptions, product }) {
    if (bundleOptions) { // TODO: this causes some kind of recurrency error
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, product, { product_option: setBundleProductOptionsAsync(context, { product: context.getters.getCurrentProduct, bundleOptions: bundleOptions }) }))
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
      const originalProduct = context.getters.getOriginalProduct

      // check if passed variant is the same as original
      const productUpdated = Object.assign({}, originalProduct, productVariant)
      populateProductConfigurationAsync(context, { product: productUpdated, selectedVariant: productVariant })
      if (!config.products.gallery.mergeConfigurableChildren) {
        context.commit(types.PRODUCT_SET_GALLERY, attributeImages(productVariant))
      }
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, productUpdated))
      return productUpdated
    } else Logger.debug('Unable to update current product.', 'product')()
  },
  /**
   * Set given product as original
   * @param {Object} context
   * @param {Object} originalProduct
   */
  setOriginal (context, originalProduct) {
    if (originalProduct && typeof originalProduct === 'object') context.commit(types.PRODUCT_SET_ORIGINAL, Object.assign({}, originalProduct))
    else Logger.debug('Unable to setup original product.', 'product')()
  },
  /**
   * Set related products
   */
  related (context, { key = 'related-products', items }) {
    context.commit(types.PRODUCT_SET_RELATED, { key, items })
  },

  // Deprecated methods, remove in 2.0
  async fetch () {
    throw new Error('product/fetch has been moved into product/loadProduct')
  },
  async fetchAsync () {
    throw new Error('product/fetchAsync has been moved into product/loadProduct')
  },

  /**
   * Load product attributes
   */
  async loadProductAttributes ({ dispatch }, { product }) {
    const productFields = Object.keys(product).filter(fieldName => {
      return !config.entities.product.standardSystemFields.includes(fieldName) // don't load metadata info for standard fields
    })
    const { product: { useDynamicAttributeLoader }, optimize, attribute } = config.entities
    return dispatch('attribute/list', { // load attributes to be shown on the product details - the request is now async
      filterValues: useDynamicAttributeLoader ? productFields : null,
      only_visible: !!useDynamicAttributeLoader,
      only_user_defined: true,
      includeFields: optimize ? attribute.includeFields : null
    }, { root: true })
  },

  /**
   * Load the product data and sets current product
   */
  async loadProduct ({ dispatch }, { parentSku, childSku = null, route = null }) {
    Logger.info('Fetching product data asynchronously', 'product', { parentSku, childSku })()
    EventBus.$emit('product-before-load', { store: rootStore, route: route })
    await dispatch('reset')
    // pass both id and sku to render a product
    const productSingleOptions = {
      sku: parentSku,
      childSku: childSku
    }
    const product = await dispatch('single', { options: productSingleOptions })
    if (product.status >= 2) {
      throw new Error(`Product query returned empty result product status = ${product.status}`)
    }
    if (product.visibility === 1) { // not visible individually (https://magento.stackexchange.com/questions/171584/magento-2-table-name-for-product-visibility)
      if (config.products.preventConfigurableChildrenDirectAccess) {
        const parentProduct = await dispatch('findConfigurableParent', { product })
        checkParentRedirection(product, parentProduct)
      } else {
        throw new Error(`Product query returned empty result product visibility = ${product.visibility}`)
      }
    }

    await dispatch('loadProductAttributes', { product })
    const syncPromises = []
    const variantsFilter = dispatch('filterUnavailableVariants', { product })
    const gallerySetup = dispatch('setProductGallery', { product })
    if (isServer) {
      syncPromises.push(variantsFilter)
      syncPromises.push(gallerySetup)
    }
    await Promise.all(syncPromises)
    await EventBus.$emitFilter('product-after-load', { store: rootStore, route: route })
    return product
  },
  /**
   * Add custom option validator for product custom options
   */
  addCustomOptionValidator (context, { validationRule, validatorFunction }) {
    context.commit(types.PRODUCT_SET_CUSTOM_OPTION_VALIDATOR, { validationRule, validatorFunction })
  },

  /**
   * Set product gallery depending on product type
   */

  setProductGallery (context, { product }) {
    if (product.type_id === 'configurable' && product.hasOwnProperty('configurable_children')) {
      if (!config.products.gallery.mergeConfigurableChildren && product.is_configured) {
        context.commit(types.PRODUCT_SET_GALLERY, attributeImages(context.getters.getCurrentProduct))
      } else {
        let productGallery = uniqBy(configurableChildrenImages(product).concat(getMediaGallery(product)), 'src').filter(f => { return f.src && f.src !== config.images.productPlaceholder })
        context.commit(types.PRODUCT_SET_GALLERY, productGallery)
      }
    } else {
      let productGallery = uniqBy(configurableChildrenImages(product).concat(getMediaGallery(product)), 'src').filter(f => { return f.src && f.src !== config.images.productPlaceholder })
      context.commit(types.PRODUCT_SET_GALLERY, productGallery)
    }
  },
  async loadProductBreadcrumbs ({ dispatch, rootGetters }, { product } = {}) {
    if (product && product.category_ids) {
      const currentCategory = rootGetters['category-next/getCurrentCategory']
      let breadcrumbCategory
      const categoryFilters = Object.assign({ 'id': [...product.category_ids] }, cloneDeep(config.entities.category.breadcrumbFilterFields))
      const categories = await dispatch('category-next/loadCategories', { filters: categoryFilters, reloadAll: Object.keys(config.entities.category.breadcrumbFilterFields).length > 0 }, { root: true })
      if (
        (currentCategory && currentCategory.id) && // current category exist
        (config.entities.category.categoriesRootCategorylId !== currentCategory.id) && // is not highest category (All) - if we open product from different page then category page
        (categories.findIndex(category => category.id === currentCategory.id) >= 0) // can be found in fetched categories
      ) {
        breadcrumbCategory = currentCategory // use current category if set and included in the filtered list
      } else {
        breadcrumbCategory = categories.sort((a, b) => (a.level > b.level) ? -1 : 1)[0] // sort starting by deepest level
      }
      await dispatch('category-next/loadCategoryBreadcrumbs', { category: breadcrumbCategory, currentRouteName: product.name }, { root: true })
    }
  }
}

export default actions
