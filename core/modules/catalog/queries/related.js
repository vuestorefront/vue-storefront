import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import store from '@vue-storefront/core/store'

export function prepareRelatedQuery (key, sku) {
  let relatedProductsQuery = new SearchQuery()

  relatedProductsQuery = relatedProductsQuery.applyFilter({key: key, value: {'in': sku}})

  relatedProductsQuery = relatedProductsQuery
    .applyFilter({key: 'visibility', value: {'in': [2, 3, 4]}})
    .applyFilter({key: 'status', value: {'in': [0, 1, 2]}}) // @TODO Check if status 2 (disabled) was set not by occasion here

  if (store.state.config.products.listOutOfStockProducts === false) {
    relatedProductsQuery = relatedProductsQuery.applyFilter({key: 'stock.is_in_stock', value: {'eq': true}})
  }

  return relatedProductsQuery
}
