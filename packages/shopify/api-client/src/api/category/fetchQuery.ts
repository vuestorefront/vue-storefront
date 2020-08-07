import { _shopifyClient } from '../../index';
import { Category, CategorySearchParams } from '../../types';

/**
 * Fetches all collections on the shop that match the query.
 *
 * @example
 * _shopifyClient.collection.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((collections) => {
 *   // Do something with the first 10 collections sorted by title in ascending order
 * });
 *
 * @param {Object} [args] An object specifying the query data containing zero or more of:
 *   @param {Int} [args.first=20] The relay `first` param. This specifies page size.
 *   @param {String} [args.sortKey=ID] The key to sort results by. Available values are
 *   documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/collectionsortkeys|Collection Sort Keys}.
 *   @param {String} [args.query] A query string. See full documentation {@link https://help.shopify.com/api/storefront-api/reference/object/shop#collections|here}
 *   @param {Boolean} [args.reverse] Whether or not to reverse the sort order of the results
 * @return {Promise|Category[]} A promise resolving with an array of `Category`s.
 */
async function fetchQuery(options: CategorySearchParams): Promise<Category[]> {
  const collections = await _shopifyClient.collection
    .fetchQuery(options.customQuery)
    .then((collections) => {
      return collections;
    });
  return collections;
}

export default fetchQuery;
