import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const createQueryLoadingQuery = ({ productId, approved }) => {
  let query = new SearchQuery()

  if (productId) {
    query = query.applyFilter({key: 'product_id', value: {'eq': productId}})
  }

  if (approved) {
    query = query.applyFilter({key: 'review_status', value: {'eq': 1}})
  }

  return query
}
export default createQueryLoadingQuery
