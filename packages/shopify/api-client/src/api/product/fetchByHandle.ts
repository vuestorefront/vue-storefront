import { _shopifyClient } from '../../index';
import { Product, ProductSearchParams } from '../../types';

/**
 * Fetches a single product by handle on the shop.
 *
 * @example
 * _shopifyClient.product.fetchByHandle('my-product').then((product) => {
 *   // Do something with the product
 * });
 *
 * @param {String} handle The handle of the product to fetch.
 * @return {Promise|Product} A promise resolving with a `Product` type.
 */
async function fetchByHandle(options: ProductSearchParams): Promise<Product[]> {
  const products = await _shopifyClient.product
    .fetchByHandle(options.slug)
    .then((products) => {
      return products;
    });
  return products;
}

export default fetchByHandle;
