import SearchQuery from 'core/store/lib/search/searchQuery'

export function prepareInspirationsQuery () {
  let inspirationsQuery = new SearchQuery()
  inspirationsQuery = inspirationsQuery.applyFilter({key: 'category.name', value: {'eq': 'Performance Fabrics'}})

  return inspirationsQuery
}
