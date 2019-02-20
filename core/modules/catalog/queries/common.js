import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import store from '@vue-storefront/core/store'

export function prepareQuery ({queryText = '', filters = [], queryConfig = ''}) {
  let query = new SearchQuery()
  // prepare filters and searchText
  if (filters.length === 0 && queryConfig !== '') {
    // try get filters from config
    if (store.state.config.hasOwnProperty('query') && store.state.config.query.hasOwnProperty(queryConfig) && store.state.config.query[queryConfig].hasOwnProperty('filter')) {
      filters = store.state.config.query[queryConfig].filter
    }
  }

  if (queryText === '') {
    // try to get searchText from config
    if (store.state.config.hasOwnProperty('query') && store.state.config.query.hasOwnProperty(queryConfig) && store.state.config.query[queryConfig].hasOwnProperty('searchText')) {
      queryText = store.state.config.query[queryConfig].searchText
    }
  }

  // Process filters and searchText if exists
  if (filters.length > 0) {
    filters.forEach(filter => {
      query = query.applyFilter({key: filter.key, value: filter.value}) // Tees category
    })
  }

  if (queryText !== '') {
    query = query.setSearchText(queryText)
  }

  // Add basic filters
  query = query
    .applyFilter({key: 'visibility', value: {'in': [2, 3, 4]}})
    .applyFilter({key: 'status', value: {'in': [0, 1]}})

  return query
}
