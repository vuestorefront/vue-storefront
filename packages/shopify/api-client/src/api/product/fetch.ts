import { _shopifyClient } from '../../index';
import { Product, ProductSearchParams } from '../../types';

/**
 * Fetches a single product by ID on the shop.
 *
 * @example
 * _shopifyClient.product.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==').then((product) => {
 *   // Do something with the product
 * });
 *
 * @param {String} id The id of the product to fetch.
 * @return {Promise|Product} A promise resolving with a `Product` type.
 */
async function fetch(options: ProductSearchParams): Promise<Product[]> {
  return await _shopifyClient.product.fetch(options.id);
}

export default fetch;
