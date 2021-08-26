import config from 'config'
import { SearchQuery } from 'storefront-query-builder'

/**
 * Creates simple query that will search product by skus list
 */
export default function buildQuery (skus: string[]): SearchQuery {
  let productsQuery = new SearchQuery()
  productsQuery = productsQuery
    .applyFilter({ key: 'sku', value: { 'in': skus } })
    .applyFilter({ key: 'status', value: { 'in': [1] } })
  if (config.products.listOutOfStockProducts === false) {
    productsQuery = productsQuery.applyFilter({ key: 'stock.is_in_stock', value: { 'eq': true } })
  }
  return productsQuery
}
