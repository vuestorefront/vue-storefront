import { _shopifyClient } from '../../index';
import { Product, ProductSearchParams } from '../../types';

/**
 * Fetches all products on the shop that match the query.
 *
 * @example
 * _shopifyClient.product.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((products) => {
 *   // Do something with the first 10 products sorted by title in ascending order
 * });
 *
 * @param {Object} [args] An object specifying the query data containing zero or more of:
 *   @param {Int} [args.first=20] The relay `first` param. This specifies page size.
 *   @param {String} [args.sortKey=ID] The key to sort results by. Available values are
 *   documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/productsortkeys|Product Sort Keys}.
 *   @param {String} [args.query] A query string. See full documentation {@link https://help.shopify.com/api/storefront-api/reference/object/shop#products|here}
 *   @param {Boolean} [args.reverse] Whether or not to reverse the sort order of the results
 * @return {Promise|Product} A promise resolving with a `Product` type.
 */
async function fetchQuery(options: ProductSearchParams): Promise<Product[]> {
  return await _shopifyClient.product.fetchQuery(options.customQuery);
}

export default fetchQuery;
