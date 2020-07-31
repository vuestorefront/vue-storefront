import { getOptimizedFields } from '@vue-storefront/core/modules/catalog/helpers/search';
import { canCache, storeProductToCache } from './../modules/catalog/helpers/search';
import { doPlatformPricesSync } from '@vue-storefront/core/modules/catalog/helpers';
import { isServer } from '@vue-storefront/core/helpers';
import { quickSearchByQuery, isOnline } from '@vue-storefront/core/lib/search';
import { SearchQuery } from 'storefront-query-builder'
import config from 'config';
import { DataResolver } from './types/DataResolver';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger';
import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { prepareProducts } from '@vue-storefront/core/modules/catalog/helpers/prepare';
import { configureProducts } from '@vue-storefront/core/modules/catalog/helpers/configure';

const getProducts = async ({
  query,
  start = 0,
  size = 50,
  sort = '',
  excludeFields = null,
  includeFields = null,
  configuration = null,
  options: {
    prefetchGroupProducts = !isServer,
    fallbackToDefaultWhenNoAvailable = true,
    setProductErrors = false,
    setConfigurableProductOptions = config.cart.setConfigurableProductOptions,
    filterUnavailableVariants = config.products.filterUnavailableVariants,
    assignProductConfiguration = false,
    separateSelectedVariant = false
  } = {}
}: DataResolver.ProductSearchOptions): Promise<DataResolver.ProductsListResponse> => {
  const isCacheable = canCache({ includeFields, excludeFields })
  const { excluded, included } = getOptimizedFields({ excludeFields, includeFields })
  let {
    items: products = [],
    attributeMetadata = [],
    aggregations = [],
    total,
    perPage
  } = await quickSearchByQuery({
    query,
    start,
    size,
    entityType: 'product',
    sort,
    excludeFields: excluded,
    includeFields: included
  })

  products = prepareProducts(products)

  for (let product of products) { // we store each product separately in cache to have offline access to products/single method
    if (isCacheable) { // store cache only for full loads
      storeProductToCache(product, 'sku')
    }
  }

  const configuredProducts = await configureProducts({
    products,
    attributes_metadata: attributeMetadata,
    configuration,
    options: {
      prefetchGroupProducts,
      fallbackToDefaultWhenNoAvailable,
      setProductErrors,
      setConfigurableProductOptions,
      filterUnavailableVariants,
      assignProductConfiguration,
      separateSelectedVariant
    },
    excludeFields: excluded,
    includeFields: included
  })

  return {
    items: configuredProducts,
    perPage,
    start,
    total,
    aggregations,
    attributeMetadata
  }
}

const getProductRenderList = async ({
  skus,
  isUserGroupedTaxActive,
  userGroupId,
  token
}): Promise<DataResolver.ProductsListResponse> => {
  const { i18n, storeId } = currentStoreView()
  let url = [
    `${getApiEndpointUrl(config.products, 'endpoint')}/render-list`,
    `?skus=${encodeURIComponent(skus.join(','))}`,
    `&currencyCode=${encodeURIComponent(i18n.currencyCode)}`,
    `&storeId=${encodeURIComponent(storeId)}`
  ].join('')
  if (isUserGroupedTaxActive) {
    url = `${url}&userGroupId=${userGroupId}`
  }

  if (token && !config.users.tokenInHeader) {
    url = `${url}&token=${token}`
  }

  try {
    const task = await TaskQueue.execute({ url, // sync the cart
      payload: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && config.users.tokenInHeader ? { authorization: `Bearer ${token}` } : {})
        },
        mode: 'cors'
      },
      callback_event: 'prices-after-sync'
    })
    return task.result as DataResolver.ProductsListResponse
  } catch (err) {
    console.error(err)
    return { items: [] }
  }
}

const getProduct = async (options: { [key: string]: string }, key: string): Promise<Product> => {
  let searchQuery = new SearchQuery()
  searchQuery = searchQuery.applyFilter({ key: key, value: { 'eq': options[key] } })
  const { items = [] } = await getProducts({
    query: searchQuery,
    size: 1,
    configuration: { sku: options.childSku },
    options: {
      prefetchGroupProducts: true,
      assignProductConfiguration: true
    }
  })
  return items[0] || null
}

const getProductFromCache = async (options: { [key: string]: string }, key: string): Promise<Product> => {
  try {
    const cacheKey = entityKeyName(key, options[key])
    const cache = StorageManager.get('elasticCache')
    const result = await cache.getItem(cacheKey)
    if (result !== null) {
      if (config.products.alwaysSyncPlatformPricesOver) {
        if (!config.products.waitForPlatformSync) {
          await doPlatformPricesSync([result])
        } else {
          doPlatformPricesSync([result])
        }
      }
      const { excluded, included } = getOptimizedFields({ excludeFields: null, includeFields: null })
      const [product] = await configureProducts({
        products: [result],
        attributes_metadata: [],
        configuration: { [key]: options.childSku || options.sku || options[key] },
        options: {
          prefetchGroupProducts: true,
          setConfigurableProductOptions: config.cart.setConfigurableProductOptions,
          filterUnavailableVariants: config.products.filterUnavailableVariants,
          assignProductConfiguration: true
        },
        excludeFields: excluded,
        includeFields: included
      })
      return product
    } else {
      return getProduct(options, key)
    }
  } catch (err) {
    // report errors
    if (err) {
      Logger.error(err, 'product')()
    }
    return getProduct(options, key)
  }
}

const getProductByKey = async ({ options, key, skipCache }: DataResolver.ProductByKeySearchOptions): Promise<Product> => {
  if (!isOnline()) {
    return getProductFromCache(options, key)
  }
  const result = skipCache
    ? await getProduct(options, key)
    : await getProductFromCache(options, key)
  return result
}

export const ProductService: DataResolver.ProductService = {
  getProducts,
  getProductRenderList,
  getProductByKey
}
