import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { isServer } from '@vue-storefront/core/helpers'
import { SearchQuery } from 'storefront-query-builder'
import cloneDeep from 'lodash-es/cloneDeep'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'
import { Logger } from '@vue-storefront/core/lib/logger';
import config from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'
import {
  registerProductsMapping,
  doPlatformPricesSync,
  setCustomProductOptionsAsync,
  setBundleProductOptionsAsync,
  getProductGallery,
  setRequestCacheTags
} from '@vue-storefront/core/modules/catalog/helpers'
import { getProductConfigurationOptions } from '@vue-storefront/core/modules/catalog/helpers/productOptions'
import { checkParentRedirection } from '@vue-storefront/core/modules/catalog/events'

const actions: ActionTree<ProductState, RootState> = {
  doPlatformPricesSync (context, { products }) {
    return doPlatformPricesSync(products)
  },
  /**
   * This is fix for https://github.com/vuestorefront/vue-storefront/issues/508
   * TODO: probably it would be better to have "parent_id" for simple products or to just ensure configurable variants are not visible in categories/search
   */
  checkConfigurableParent ({ commit, dispatch, getters }, { product }) {
    if (product.type_id === 'simple') {
      Logger.log('Checking configurable parent')()
      const parent = dispatch('findConfigurableParent', { product: { sku: getters.getCurrentProduct.sku } })
      if (parent) {
        commit(types.PRODUCT_SET_PARENT, parent)
      }
      return parent
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
  async list (context, {
    query,
    start = 0,
    size = 50,
    sort = '',
    prefetchGroupProducts = !isServer,
    excludeFields = null,
    includeFields = null,
    configuration = null,
    populateRequestCacheTags = true,
    updateState = false,
    append = false
  } = {}) {
    Logger.warn('`product/list` deprecated, will be not used from 1.12, use "findProducts" instead')()
    const { items } = await context.dispatch('findProducts', {
      query,
      start,
      size,
      sort,
      excludeFields,
      includeFields,
      configuration,
      options: {
        populateRequestCacheTags,
        prefetchGroupProducts
      }
    })

    if (updateState) {
      Logger.warn('updateState and append are deprecated, will be not used from 1.12')()
      if (append) context.commit(types.PRODUCT_ADD_PAGED_PRODUCTS, { items })
      else context.commit(types.PRODUCT_SET_PAGED_PRODUCTS, { items })
    }

    EventBus.$emit('product-after-list', { query, start, size, sort, entityType: 'product', result: { items } })

    return { items }
  },
  async findProducts (context, {
    query,
    start = 0,
    size = 50,
    sort = '',
    excludeFields = null,
    includeFields = null,
    configuration = null,
    populateRequestCacheTags = false,
    options: {
      populateRequestCacheTags: populateRequestCacheTagsNew = false,
      prefetchGroupProducts = !isServer,
      setProductErrors = false,
      fallbackToDefaultWhenNoAvailable = true,
      assignProductConfiguration = false,
      separateSelectedVariant = false,
      setConfigurableProductOptions = config.cart.setConfigurableProductOptions,
      filterUnavailableVariants = config.products.filterUnavailableVariants
    } = {}
  } = {}) {
    const { items, ...restResponseData } = await ProductService.getProducts({
      query,
      start,
      size,
      sort,
      excludeFields,
      includeFields,
      configuration,
      options: {
        prefetchGroupProducts,
        fallbackToDefaultWhenNoAvailable,
        setProductErrors,
        setConfigurableProductOptions,
        filterUnavailableVariants,
        assignProductConfiguration,
        separateSelectedVariant
      }
    })

    registerProductsMapping(context, items)

    if (populateRequestCacheTags) {
      Logger.warn('deprecated from 1.13, use "options.populateRequestCacheTags" instead')()
    }

    if (populateRequestCacheTags || populateRequestCacheTagsNew) {
      setRequestCacheTags({ products: items })
    }

    await context.dispatch('tax/calculateTaxes', { products: items }, { root: true })

    return { ...restResponseData, items }
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
  async single (context, {
    options = {},
    setCurrentProduct = false,
    key = 'sku',
    skipCache = false
  } = {}) {
    if (setCurrentProduct) {
      Logger.warn('option `setCurrentProduct` is deprecated, will be not used from 1.13')()
    }
    if (!options[key]) {
      throw new Error('Please provide the search key ' + key + ' for product/single action!')
    }
    const product = await ProductService.getProductByKey({
      options,
      key,
      skipCache
    })

    await context.dispatch('tax/calculateTaxes', { products: [product] }, { root: true })

    if (setCurrentProduct) await context.dispatch('setCurrent', product)
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
      const { configuration, ...restProduct } = product
      const productUpdated = Object.assign({}, restProduct)
      if (!config.products.gallery.mergeConfigurableChildren) {
        context.dispatch('setProductGallery', { product: productUpdated })
      }
      const productOptions = getProductConfigurationOptions({ product, attribute: context.rootState.attribute })
      context.commit(types.PRODUCT_SET_CURRENT_OPTIONS, productOptions)
      context.commit(types.PRODUCT_SET_CURRENT_CONFIGURATION, configuration || {})
      context.commit(types.PRODUCT_SET_CURRENT, productUpdated)
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
   * Load the product data and sets current product
   */
  async loadProduct ({ dispatch, state }, { parentSku, childSku = null, route = null, skipCache = false }) {
    Logger.info('Fetching product data asynchronously', 'product', { parentSku, childSku })()
    EventBus.$emit('product-before-load', { store: rootStore, route: route })

    const product = await dispatch('single', {
      options: {
        sku: parentSku,
        childSku: childSku
      },
      key: 'sku',
      skipCache
    })

    setRequestCacheTags({ products: [product] })

    await dispatch('setCurrent', product)

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
    const productGallery = getProductGallery(product)
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
  },
  async getProductVariant (context, { product, configuration } = {}) {
    let searchQuery = new SearchQuery()
    searchQuery = searchQuery.applyFilter({ key: 'sku', value: { 'eq': product.parentSku } })
    if (!product.parentSku) {
      throw new Error('Product doesn\'t have parentSku, please check if this is configurable product')
    }
    const { items: [newProductVariant] } = await context.dispatch('findProducts', {
      query: searchQuery,
      size: 1,
      configuration,
      options: {
        fallbackToDefaultWhenNoAvailable: false,
        setProductErrors: true,
        separateSelectedVariant: true
      }
    })
    const { selectedVariant = {}, options, product_option } = newProductVariant

    return { ...selectedVariant, options, product_option }
  },
  /** Below actions are not used from 1.12 and can be removed to reduce bundle */
  ...require('./deprecatedActions').default
}

export default actions
