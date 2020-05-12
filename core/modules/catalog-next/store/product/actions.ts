import Vue from 'vue'
import config from 'config'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { currentStoreView, localizedDispatcherRoute } from '@vue-storefront/core/lib/multistore'
import {
  doPlatformPricesSync,
  setCustomProductOptionsAsync,
  setBundleProductOptionsAsync,
  getMediaGallery,
  configurableChildrenImages,
  attributeImages,
  setRequestCacheTags,
  getOptimizedFields
} from '../../helpers'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';
import { transformProductUrl } from '@vue-storefront/core/modules/url/helpers/transformUrl';
import { isServer } from '@vue-storefront/core/helpers'
import { SearchQuery } from 'storefront-query-builder'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import cloneDeep from 'lodash-es/cloneDeep'
import uniqBy from 'lodash-es/uniqBy'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '@vue-storefront/core/modules/catalog/types/ProductState'
import { Logger } from '@vue-storefront/core/lib/logger';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'

const actions: ActionTree<ProductState, RootState> = {
  doPlatformPricesSync (context, { products }) {
    return doPlatformPricesSync(products)
  },
  /**
   * Download Magento2 / other platform prices to put them over ElasticSearch prices
   */
  syncPlatformPricesOver ({ rootGetters }, { skus }) {
    const storeView = currentStoreView()
    let url = `${getApiEndpointUrl(config.products, 'endpoint')}/render-list?skus=${encodeURIComponent(skus.join(','))}&currencyCode=${encodeURIComponent(storeView.i18n.currencyCode)}&storeId=${encodeURIComponent(storeView.storeId)}`
    if (rootGetters['tax/getIsUserGroupedTaxActive']) {
      url = `${url}&userGroupId=${rootGetters['tax/getUserTaxGroupId']}`
    }

    if (rootGetters['user/getToken']) {
      url = `${url}&token=${rootGetters['user/getToken']}`
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
   * This is fix for https://github.com/DivanteLtd/vue-storefront/issues/508
   * TODO: probably it would be better to have "parent_id" for simple products or to just ensure configurable variants are not visible in categories/search
   */
  checkConfigurableParent ({ dispatch, getters }, { product }) {
    if (product.type_id === 'simple') {
      Logger.log('Checking configurable parent')()
      return dispatch('findConfigurableParent', { product: { sku: getters.getCurrentProduct.sku } })
    }
  },
  /**
   * Search ElasticSearch catalog of products using simple text query
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   * @param {Object} query is the object of searchQuery class
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  async list ({ dispatch, commit }, {
    query,
    start = 0,
    size = 50,
    entityType = 'product',
    sort = '',
    cacheByKey = 'sku',
    prefetchGroupProducts = !isServer,
    updateState = false,
    meta = {},
    excludeFields = null,
    includeFields = null,
    configuration = null,
    append = false,
    populateRequestCacheTags = true
  }) {
    const searchResult = await dispatch('findProducts', {
      query,
      start,
      size,
      entityType,
      sort,
      cacheByKey,
      excludeFields,
      includeFields,
      configuration,
      populateRequestCacheTags,
      prefetchGroupProducts
    })

    dispatch('registerProductsMapping', searchResult.items)

    if (updateState) {
      if (append) commit(types.PRODUCT_ADD_PAGED_PRODUCTS, searchResult)
      else commit(types.PRODUCT_SET_PAGED_PRODUCTS, searchResult)
    }

    EventBus.$emit('product-after-list', { query, start, size, sort, entityType, meta, result: searchResult })

    return searchResult
  },
  async registerProductsMapping ({ dispatch }, products = []) {
    await Promise.all(products.map(product => {
      if (product.url_path) {
        const { url_path, sku, slug, type_id, parentSku } = product
        return dispatch('url/registerMapping', {
          url: localizedDispatcherRoute(url_path),
          routeData: transformProductUrl({ sku, parentSku, slug, type_id })
        }, { root: true })
      }
    }))
  },
  async findProducts (context, {
    query,
    start = 0,
    size = 50,
    entityType = 'product',
    sort = '',
    excludeFields = null,
    includeFields = null,
    configuration = null,
    populateRequestCacheTags = true,
    prefetchGroupProducts = !isServer,
    setProductErrors = false,
    fallbackToDefaultWhenNoAvailable = true,
    assignProductConfiguration = false,
    setFirstVariantAsDefaultInURL = config.products.setFirstVarianAsDefaultInURL,
    separateSelectedVariant = false
  }) {
    const { excluded, included } = getOptimizedFields({ excludeFields, includeFields })
    const resp = await quickSearchByQuery({
      query,
      start,
      size,
      entityType,
      sort,
      excludeFields: excluded,
      includeFields: included,
      options: {
        prefetchGroupProducts,
        fallbackToDefaultWhenNoAvailable,
        setProductErrors,
        setConfigurableProductOptions: config.cart.setConfigurableProductOptions,
        filterUnavailableVariants: config.products.filterUnavailableVariants,
        assignProductConfiguration,
        setFirstVariantAsDefaultInURL,
        separateSelectedVariant
      },
      filters: configuration
    })

    if (populateRequestCacheTags) {
      setRequestCacheTags({ products: resp.items })
    }

    await context.dispatch('tax/calculateTaxes', { products: resp.items }, { root: true })

    // storeProductToCache()

    return resp
  },
  async findConfigurableParent (context, { product, configuration }) {
    const searchQuery = new SearchQuery()
    const query = searchQuery.applyFilter({ key: 'configurable_children.sku', value: { 'eq': product.sku } })
    const products = await context.dispatch('findProducts', { query, configuration })
    return products.items && products.items.length > 0 ? products.items[0] : null
  },
  /**
   * Search products by specific field
   * @param {Object} options
   */
  async single ({ dispatch }, {
    options,
    setCurrentProduct = true,
    key = 'sku',
    skipCache = false
  }) {
    if (!options[key]) {
      throw Error('Please provide the search key ' + key + ' for product/single action!')
    }

    const benchmarkTime = new Date()

    const getProduct = async () => {
      let searchQuery = new SearchQuery()
      searchQuery = searchQuery.applyFilter({ key: key, value: { 'eq': options[key] } })
      const response = await dispatch('findProducts', {
        query: searchQuery,
        size: 1,
        configuration: { sku: options.childSku },
        prefetchGroupProducts: true,
        assignProductConfiguration: true
      })
      return response.items && response.items.length > 0 ? response.items[0] : null
    }

    const getProductFromCache = async () => {
      try {
        const cacheKey = entityKeyName(key, options[key])
        const cache = StorageManager.get('elasticCache')
        const res = await cache.getItem(cacheKey)
        if (res !== null) {
          Logger.debug('Product:single - result from localForage (for ' + cacheKey + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()), 'product')()
          if (config.products.alwaysSyncPlatformPricesOver) {
            if (!config.products.waitForPlatformSync) {
              await doPlatformPricesSync([res])
            } else {
              doPlatformPricesSync([res])
            }
          }
          return res
        } else {
          return getProduct()
        }
      } catch (err) {
        // report errors
        if (!skipCache && err) {
          Logger.error(err, 'product')()
        }
        return getProduct()
      }
    }

    const product = skipCache ? await getProduct() : await getProductFromCache()
    if (setCurrentProduct) await dispatch('setCurrent', product)
    EventBus.$emitFilter('product-after-single', { key, options, product })

    return product
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
  setCurrent (context, product) {
    if (product && typeof product === 'object') {
      const productUpdated = Object.assign({}, product)
      Vue.set(context.state, 'current_configuration', product.configuration || {})
      if (!config.products.gallery.mergeConfigurableChildren) {
        context.dispatch('setProductGallery', { product: productUpdated })
      }
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, productUpdated))
      return productUpdated
    } else Logger.debug('Unable to update current product.', 'product')()
  },
  /**
   * Set related products
   */
  related (context, { key = 'related-products', items }) {
    context.commit(types.PRODUCT_SET_RELATED, { key, items })
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
      throw new Error(`Product query returned empty result product visibility = ${product.visibility}`)
    }

    if (config.entities.attribute.loadByAttributeMetadata) {
      await dispatch('attribute/loadProductAttributes', { products: [product] }, { root: true })
    } else {
      await dispatch('loadProductAttributes', { product })
    }

    const syncPromises = []
    const gallerySetup = dispatch('setProductGallery', { product })
    if (isServer) {
      syncPromises.push(gallerySetup)
    }
    if (config.products.preventConfigurableChildrenDirectAccess) {
      const parentChecker = dispatch('checkConfigurableParent', { product })
      if (isServer) {
        syncPromises.push(parentChecker)
      }
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
        return context.commit(types.PRODUCT_SET_GALLERY, attributeImages(context.getters.getCurrentProduct))
      }
    }
    const productGallery = uniqBy(configurableChildrenImages(product).concat(getMediaGallery(product)), 'src')
      .filter(f => f.src && f.src !== config.images.productPlaceholder)
    context.commit(types.PRODUCT_SET_GALLERY, productGallery)
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
