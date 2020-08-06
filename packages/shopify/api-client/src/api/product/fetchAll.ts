import { _shopifyClient } from '../../index';
import { Product } from '../../types';

/**
 * Fetches all products on the shop.
 *
 * @example
 * _shopifyClient.product.fetchAll().then((products) => {
 *   // Do something with the products
 * });
 *
 * @return {Promise|Product} A promise resolving with a `Product` type.
 */
async function fetchAll(): Promise<Product[]> {
  const products = await _shopifyClient.product
    .fetchAll()
    .then((products) => {
      return products;
    });
  return products;
}

export default fetchAll;
