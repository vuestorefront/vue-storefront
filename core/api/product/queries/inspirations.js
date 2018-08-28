import SearchQuery from 'core/store/lib/search/searchQuery'

export function prepareInspirationsQuery () {
  let inspirationsQuery = new SearchQuery()
  inspirationsQuery = inspirationsQuery.applyFilter({key: 'category.name', value: {'eq': 'Performance Fabrics'}})
    .applyFilter({key: 'visibility', value: {'in': [2, 3, 4]}})
    .applyFilter({key: 'status', value: {'in': [0, 1]}})

  return inspirationsQuery
}
