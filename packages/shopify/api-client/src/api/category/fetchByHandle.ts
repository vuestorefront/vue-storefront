import { Category, CategorySearchParams } from '../../types';
import fetchByCustomQuery from './fetchByCustomQuery';

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
  const searchParams: any = {
    handle: options.slug,
    products: {
      sortKey: null
    }
  };
  const shopifySortKeys = {
    vendor: 'VENDOR',
    createdAt: 'CREATED',
    id: 'ID',
    price: 'PRICE',
    productType: 'PRODUCT_TYPE',
    title: 'TITLE',
    updatedAt: 'UPDATED_AT',
    bestSelling: 'BEST_SELLING'
  };

  if (options.sort) {
    if (shopifySortKeys[options.sort]) {
      searchParams.products.sortKey = shopifySortKeys[options.sort];
    } else if (options.sort === 'price-asc' || options.sort === 'price-desc') {
      if (options.sort === 'price-desc') {
        searchParams.products.reverse = true;
      }
      searchParams.products.sortKey = shopifySortKeys.price;
    }
  }
  if (options.after) {
    searchParams.products.after = options.after;
  }
  if (options.first) searchParams.products.first = parseInt(options.first);

  const collections = await fetchByCustomQuery(searchParams);
  return [collections];
}

export default fetchByHandle;
