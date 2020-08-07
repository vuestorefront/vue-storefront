import { _shopifyClient } from '../../index';
import { Category } from '../../types';

/**
 * Fetches all collections on the shop, not including products.
 * To fetch collections with products use [fetchAllsWithProducts].
 *
 * @example
 * _shopifyClient.collection.fetchAll().then((collections) => {
 *   // Do something with the collections
 * });
 *
 * @return {Promise|Category[]} A promise resolving with an array of `Category`s.
 */
async function fetchAll(): Promise<Category[]> {
  const collections = await _shopifyClient.collection
    .fetchAll()
    .then((collections) => {
      return collections;
    });
  return collections;
}

export default fetchAll;
