import { _shopifyClient } from '../../index';
import { Product, ProductSearchParams } from '../../types';

/**
 * Fetches multiple products by ID on the shop.
 *
 * @example
 * const ids = ['Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==', 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ='];
 * _shopifyClient.product.fetchMultiple(ids).then((products) => {
 *   // Do something with the products
 * });
 *
 * @param {String[]} ids The ids of the products to fetch
 * @return {Promise|Product} A promise resolving with a `Product` type.
 */
async function fetchMultiple(options: ProductSearchParams): Promise<Product[]> {
  const products = await _shopifyClient.product
    .fetch(options.ids)
    .then((products) => {
      return products;
    });
  return products;
}

export default fetchMultiple;
