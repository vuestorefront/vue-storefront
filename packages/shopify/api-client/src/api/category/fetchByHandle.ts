import { _shopifyClient } from '../../index';
import { Category, CategorySearchParams } from '../../types';

/**
 * Fetches a collection by handle on the shop.
 *
 * @example
 * _shopifyClient.collection.fetchByHandle('my-collection').then((collection) => {
 *   // Do something with the collection
 * });
 *
 * @param {String} handle The handle of the collection to fetch.
 * @return {Promise|Category} A promise resolving with an single `Category`.
 */
async function fetchByHandle(options: CategorySearchParams): Promise<Category[]> {
  const collections = await _shopifyClient.collection.fetchByHandle(options.slug);
  return [collections];
}

export default fetchByHandle;
