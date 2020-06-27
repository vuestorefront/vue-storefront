import { _shopifyClient } from '../../index';
import { Category, CategorySearchParams } from '../../types';

/**
 * Fetches a single collection by ID on the shop, not including products.
 * To fetch the collection with products use [fetchWithProducts].
 *
 * @example
 * _shopifyClient.collection.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
 *   // Do something with the collection
 * });
 *
 * @param {String} id The id of the collection to fetch.
 * @return {Promise|Category} A promise resolving with an single `Category`.
 */
async function fetch(options: CategorySearchParams): Promise<Category[]> {
  const collections = await _shopifyClient.collection
    .fetch(options.id)
    .then((collections) => {
      return collections;
    });
  return collections;
}

export default fetch;
