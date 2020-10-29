import { _shopifyClient } from '../../index';
import { Category, CategorySearchParams } from '../../types';

/**
 * Fetches a single collection by ID on the shop, including products.
 *
 * @example
 * _shopifyClient.collection.fetchWithProducts('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
 *   // Do something with the collection
 * });
 *
 * @param {String} id The id of the collection to fetch.
 * @return {Promise|Category} A promise resolving with an single `Category`.
 */
async function fetchWithProducts(options: CategorySearchParams): Promise<Category[]> {
  return await _shopifyClient.collection.fetchWithProducts(options.id);
}

export default fetchWithProducts;
