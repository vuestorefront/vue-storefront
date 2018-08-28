import SearchQuery from 'core/store/lib/search/searchQuery'

export function preparePageNotFoundQuery () {
  let ourBestsellersQuery = new SearchQuery()
  ourBestsellersQuery = ourBestsellersQuery
    .applyFilter({key: 'visibility', value: {'in': [2, 3, 4]}})

  return ourBestsellersQuery
}
