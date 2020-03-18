import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import config from 'config'

export function prepareRelatedQuery (key, sku) {
  let relatedProductsQuery = new SearchQuery()

  relatedProductsQuery = relatedProductsQuery.applyFilter({ key: key, value: { 'in': sku } })

  relatedProductsQuery = relatedProductsQuery
    .applyFilter({ key: 'visibility', value: { 'in': [2, 3, 4] } })
    .applyFilter({ key: 'status', value: { 'in': [1] } })

  if (config.products.listOutOfStockProducts === false) {
    relatedProductsQuery = relatedProductsQuery.applyFilter({ key: 'stock.is_in_stock', value: { 'eq': true } })
  }

  return relatedProductsQuery
}
