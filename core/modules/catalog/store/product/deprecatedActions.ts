import { optionLabel } from '../../helpers/optionLabel'
import trim from 'lodash-es/trim'
import { formatBreadCrumbRoutes, isServer } from '@vue-storefront/core/helpers'
import { preConfigureProduct, storeProductToCache, isGroupedOrBundle } from '@vue-storefront/core/modules/catalog/helpers/search'
import toString from 'lodash-es/toString'
import {
  registerProductsMapping,
  filterOutUnavailableVariants
} from '@vue-storefront/core/modules/catalog/helpers'
import { Logger } from '@vue-storefront/core/lib/logger';
import * as types from './mutation-types'
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'
import config from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
const { populateProductConfigurationAsync } = require('@vue-storefront/core/modules/catalog/helpers')

const actions = {
  /**
   * Reset current configuration and selected variatnts
   */
  reset (context) {
    Logger.warn('`product/reset` deprecated, will be not used from 1.12')()
    const originalProduct = Object.assign({}, context.getters.getOriginalProduct)
    context.commit(types.PRODUCT_RESET_CURRENT, originalProduct)
  },
  /**
   * Setup product breadcrumbs path
   */
  async setupBreadcrumbs (context, { product }) {
    Logger.warn('`product/setupBreadcrumbs` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/syncPlatformPricesOver`deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/setupAssociated` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/loadConfigurableAttributes` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/setupVariants` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/filterUnavailableVariants` deprecated, will be not used from 1.12')()
    return filterOutUnavailableVariants(context, product)
  },
  preConfigureAssociated (context, { searchResult, prefetchGroupProducts }) {
    Logger.warn('`product/preConfigureAssociated` deprecated, will be not used from 1.12')()
    registerProductsMapping(context, searchResult.items)
    for (let product of searchResult.items) {
      if (isGroupedOrBundle(product) && prefetchGroupProducts && !isServer) {
        context.dispatch('setupAssociated', { product })
      }
    }
  },
  async preConfigureProduct (context, { product, populateRequestCacheTags, configuration }) {
    Logger.warn('`product/preConfigureProduct` deprecated, will be not used from 1.12')()
    let _product = preConfigureProduct({ product, populateRequestCacheTags })

    if (configuration) {
      const selectedVariant = await context.dispatch('getProductVariant', { product: _product, configuration })
      _product = Object.assign({}, _product, selectedVariant)
    }

    return _product
  },
  async configureLoadedProducts (context, { products, isCacheable, cacheByKey, populateRequestCacheTags, configuration }) {
    Logger.warn('`product/configureLoadedProducts` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/configureBundleAsync` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/configureGroupedAsync` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/configure` deprecated, will be not used from 1.12, use "product/getProductVariant"')()
    const result = await context.dispatch('getProductVariant', { product, configuration })
    return result
  },

  setCurrentOption (context, productOption) {
    Logger.warn('`product/setCurrentOption` deprecated, will be not used from 1.12')()
    if (productOption && typeof productOption === 'object') { // TODO: this causes some kind of recurrency error
      context.commit(types.PRODUCT_SET_CURRENT, Object.assign({}, context.getters.getCurrentProduct, { product_option: productOption }))
    }
  },

  setCurrentErrors (context, errors) {
    Logger.warn('`product/setCurrentErrors` deprecated, will be not used from 1.12')()
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
    Logger.warn('`product/setOriginal` deprecated, will be not used from 1.12')()
    if (originalProduct && typeof originalProduct === 'object') context.commit(types.PRODUCT_SET_ORIGINAL, Object.assign({}, originalProduct))
    else Logger.debug('Unable to setup original product.', 'product')()
  },

  /**
   * Load product attributes
   */
  async loadProductAttributes ({ dispatch }, { product }) {
    Logger.warn('`product/loadProductAttributes` deprecated, will be not used from 1.12')()
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
