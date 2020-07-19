import Vue from 'vue';
import { Logger } from '@vue-storefront/core/lib/logger';
import config from 'config';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { entityKeyName } from '@vue-storefront/core/lib/store/entities';

export const canCache = ({ includeFields, excludeFields }) => {
  const isCacheable = includeFields === null && excludeFields === null;

  if (isCacheable) {
    Logger.debug('Entity cache is enabled for productList')();
  } else {
    Logger.debug('Entity cache is disabled for productList')();
  }

  return isCacheable;
};

const getCacheKey = (product, cacheByKey) => {
  if (!product[cacheByKey]) {
    cacheByKey = 'id';
  }

  return entityKeyName(
    cacheByKey,
    product[cacheByKey === 'sku' && product['parentSku'] ? 'parentSku' : cacheByKey]
  ); // to avoid caching products by configurable_children.sku
};

export const configureChildren = product => {
  if (product.configurable_children) {
    for (let configurableChild of product.configurable_children) {
      if (configurableChild.custom_attributes) {
        for (let opt of configurableChild.custom_attributes) {
          configurableChild[opt.attribute_code] = opt.value;
        }
      }
    }
  }

  return product;
};

export const storeProductToCache = (product, cacheByKey) => {
  const cacheKey = getCacheKey(product, cacheByKey);
  const cache = StorageManager.get('elasticCache');

  cache.setItem(cacheKey, product, null, config.products.disablePersistentProductsCache)
};

export const preConfigureProduct = ({ product, populateRequestCacheTags }) => {
  const shouldPopulateCacheTags = populateRequestCacheTags && Vue.prototype.$cacheTags;
  const isFirstVariantAsDefaultInURL =
    config.products.setFirstVarianAsDefaultInURL &&
    product.hasOwnProperty('configurable_children') &&
    product.configurable_children.length > 0;
  product.errors = {}; // this is an object to store validation result for custom options and others
  product.info = {};

  if (shouldPopulateCacheTags) {
    Vue.prototype.$cacheTags.add(`P${product.id}`);
  }

  if (!product.parentSku) {
    product.parentSku = product.sku;
  }

  if (isFirstVariantAsDefaultInURL) {
    product.sku = product.configurable_children[0].sku;
  }

  return product;
};

export const getOptimizedFields = ({ excludeFields, includeFields }) => {
  if (config.entities.optimize) {
    return {
      excluded: excludeFields || config.entities.product.excludeFields,
      included: includeFields || config.entities.product.includeFields
    };
  }

  return { excluded: excludeFields, included: includeFields };
};

export const isGroupedOrBundle = product =>
  product.type_id === 'grouped' || product.type_id === 'bundle';
