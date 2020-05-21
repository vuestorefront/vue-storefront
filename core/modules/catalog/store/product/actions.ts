import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { formatBreadCrumbRoutes, isServer } from '@vue-storefront/core/helpers'
import { preConfigureProduct, storeProductToCache, isGroupedOrBundle } from '@vue-storefront/core/modules/catalog/helpers/search'
import { SearchQuery } from 'storefront-query-builder'
import { optionLabel } from '../../helpers/optionLabel'
import trim from 'lodash-es/trim'
import cloneDeep from 'lodash-es/cloneDeep'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'
import { Logger } from '@vue-storefront/core/lib/logger';
import toString from 'lodash-es/toString'
import config from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'
import {
  registerProductsMapping,
  doPlatformPricesSync,
  filterOutUnavailableVariants,
  populateProductConfigurationAsync,
  setCustomProductOptionsAsync,
  setBundleProductOptionsAsync,
  getProductGallery,
  setRequestCacheTags
} from '@vue-storefront/core/modules/catalog/helpers'
import { getProductConfigurationOptions } from '@vue-storefront/core/modules/catalog/helpers/productOptions'

const actions: ActionTree<ProductState, RootState> = {
  doPlatformPricesSync (context, { products }) {
    return doPlatformPricesSync(products)
  },
  /**
   * This is fix for https://github.com/DivanteLtd/vue-storefront/issues/508
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
    Logger.warn('`product/list` deprecated from 1.13, will be removed, use "findProducts" instead')()
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
      Logger.warn('updateState and append are deprecated from 1.13')()
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
      Logger.warn('option `setCurrentProduct` is deprecated from 1.13')()
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
  /** Below actions will be removed in 1.13  */
  /**
   * Reset current configuration and selected variatnts
   */
  reset (context) {
    Logger.warn('`product/reset` deprecated, will be removed in 1.13')()
    const originalProduct = Object.assign({}, context.getters.getOriginalProduct)
    context.commit(types.PRODUCT_RESET_CURRENT, originalProduct)
  },
  /**
   * Setup product breadcrumbs path
   */
  async setupBreadcrumbs (context, { product }) {
    Logger.warn('`product/setupBreadcrumbs` deprecated, will be removed in 1.13')()
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
  /**
   * Download Magento2 / other platform prices to put them over ElasticSearch prices
   */
  async syncPlatformPricesOver ({ rootGetters }, { skus }) {
    Logger.warn('`product/syncPlatformPricesOver`deprecated, will be removed in 1.13')()
    const result = await ProductService.getProductRenderList({
      skus,
      isUserGroupedTaxActive: rootGetters['tax/getIsUserGroupedTaxActive'],
      userGroupId: rootGetters['tax/getUserTaxGroupId'],
      token: rootGetters['user/getToken']
    })
    return result
  },
  /**
   * Setup associated products
   */
  setupAssociated (context, { product, skipCache = true }) {
    Logger.warn('`product/setupAssociated` deprecated, will be removed in 1.13')()
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
   * Load required configurable attributes
   * @param context
   * @param product
   */
  loadConfigurableAttributes (context, { product }) {
    Logger.warn('`product/loadConfigurableAttributes` deprecated, will be removed in 1.13')()
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
  async setupVariants (context, { product }) {
    Logger.warn('`product/setupVariants` deprecated, will be removed in 1.13')()
    if (product.type_id !== 'configurable' || !product.hasOwnProperty('configurable_options')) {
      return
    }
    if (config.entities.attribute.loadByAttributeMetadata) {
      await context.dispatch('attribute/loadProductAttributes', { products: [product] }, { root: true })
    }
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
  },
  filterUnavailableVariants (context, { product }) {
    Logger.warn('`product/filterUnavailableVariants` deprecated, will be removed in 1.13')()
    return filterOutUnavailableVariants(context, product)
  },
  preConfigureAssociated (context, { searchResult, prefetchGroupProducts }) {
    Logger.warn('`product/preConfigureAssociated` deprecated, will be removed in 1.13')()
    registerProductsMapping(context, searchResult.items)
    for (let product of searchResult.items) {
      if (isGroupedOrBundle(product) && prefetchGroupProducts && !isServer) {
        context.dispatch('setupAssociated', { product })
      }
    }
  },
  async preConfigureProduct (context, { product, populateRequestCacheTags, configuration }) {
    Logger.warn('`product/preConfigureProduct` deprecated, will be removed in 1.13')()
    let _product = preConfigureProduct({ product, populateRequestCacheTags })

    if (configuration) {
      const selectedVariant = await context.dispatch('getProductVariant', { product: _product, configuration })
      _product = Object.assign({}, _product, selectedVariant)
    }

    return _product
  },
  async configureLoadedProducts (context, { products, isCacheable, cacheByKey, populateRequestCacheTags, configuration }) {
    Logger.warn('`product/configureLoadedProducts` deprecated, will be removed in 1.13')()
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
  /**
   * Update associated products for bundle product
   * @param context
   * @param product
   */
  configureBundleAsync (context, product) {
    Logger.warn('`product/configureBundleAsync` deprecated, will be removed in 1.13')()
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
    Logger.warn('`product/configureGroupedAsync` deprecated, will be removed in 1.13')()
    return context.dispatch(
      'setupAssociated', {
        product: product,
        skipCache: true
      })
      .then(() => { context.dispatch('setCurrent', product) })
  },
  /**
   * Configure product with given configuration and set it as current
   * @param {Object} context
   * @param {Object} product
   * @param {Array} configuration
   */
  async configure (context, { product = null, configuration, selectDefaultVariant = true, fallbackToDefaultWhenNoAvailable = false }) {
    Logger.warn('`product/configure` deprecated, will be removed in 1.13, use "product/getProductVariant"')()
    const result = await context.dispatch('getProductVariant', { product, configuration })
    return result
  },

  setCurrentOption (context, productOption) {
    Logger.warn('`product/setCurrentOption` deprecated, will be removed in 1.13')()
    if (productOption && typeof productOption === 'object') { // TODO: this causes some kind of recurrency error
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, context.getters.getCurrentProduct, { product_option: productOption }))
    }
  },

  setCurrentErrors (context, errors) {
    Logger.warn('`product/setCurrentErrors` deprecated, will be removed in 1.13')()
    if (errors && typeof errors === 'object') {
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, context.getters.getCurrentProduct, { errors: errors }))
    }
  },
  /**
   * Set given product as original
   * @param {Object} context
   * @param {Object} originalProduct
   */
  setOriginal (context, originalProduct) {
    Logger.warn('`product/setOriginal` deprecated, will be removed in 1.13')()
    if (originalProduct && typeof originalProduct === 'object') context.commit(types.PRODUCT_SET_ORIGINAL, Object.assign({}, originalProduct))
    else Logger.debug('Unable to setup original product.', 'product')()
  },

  /**
   * Load product attributes
   */
  async loadProductAttributes ({ dispatch }, { product }) {
    Logger.warn('`product/loadProductAttributes` deprecated, will be removed in 1.13')()
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
  }
}

export default actions
