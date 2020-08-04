import { Product, ProductSearchParams } from '../../types';
import fetchAll from './fetchAll';
import fetchByHandle from './fetchByHandle';
import fetch from './fetch';
import fetchMultiple from './fetchMultiple';
import fetchQuery from './fetchQuery';
import { settings } from '../../index';

async function getProduct(options: ProductSearchParams): Promise<Product[]> {
  if (settings.overrides.getProduct) {
    return settings.overrides.getProduct(options);
  }

  // Replace sort by keys with shopify keys
  const shopifySortKeys = {
    vendor: 'VENDOR',
    createdAt: 'CREATED_AT',
    id: 'ID',
    price: 'PRICE',
    productType: 'PRODUCT_TYPE',
    title: 'TITLE',
    updatedAt: 'UPDATED_AT',
    bestSelling: 'BEST_SELLING'
  };

  if (options.customQuery && options.customQuery.sortKey) {
    if (shopifySortKeys[options.customQuery.sortKey]) {
      options.customQuery.sortKey = shopifySortKeys[options.customQuery.sortKey];
    } else if (options.customQuery.sortKey === 'price-asc' || options.customQuery.sortKey === 'price-desc') {
      if (options.customQuery.sortKey === 'price-asc') {
        options.customQuery.reverse = false;
      }
      options.customQuery.sortKey = shopifySortKeys.price;
    }
  }

  if (options.slug === '/') {
    delete options.slug;
  }

  if (options.id) {
    return fetch(options);
  } else if (options.ids) {
    return fetchMultiple(options);
  } else if (options.slug) {
    return fetchByHandle(options);
  } else if (options.customQuery) {
    return fetchQuery(options);
  } else {
    return fetchAll();
  }
}

export default getProduct;
