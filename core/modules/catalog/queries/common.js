import { SearchQuery } from 'storefront-query-builder'
import config from 'config'

export function prepareQuery ({ queryText = '', filters = [], queryConfig = '' }) {
  let query = new SearchQuery()
  // prepare filters and searchText
  if (filters.length === 0 && queryConfig !== '') {
    // try get filters from config
    if (config.hasOwnProperty('query') && config.query.hasOwnProperty(queryConfig) && config.query[queryConfig].hasOwnProperty('filter')) {
      filters = config.query[queryConfig].filter
    }
  }

  if (queryText === '') {
    // try to get searchText from config
    if (config.hasOwnProperty('query') && config.query.hasOwnProperty(queryConfig) && config.query[queryConfig].hasOwnProperty('searchText')) {
      queryText = config.query[queryConfig].searchText
    }
  }

  // Process filters and searchText if exists
  if (filters.length > 0) {
    filters.forEach(filter => {
      query = query.applyFilter({ key: filter.key, value: filter.value }) // Tees category
    })
  }

  if (queryText !== '') {
    query = query.setSearchText(queryText)
  }

  // Add basic filters
  query = query
    .applyFilter({ key: 'visibility', value: { 'in': [2, 3, 4] } })
    .applyFilter({ key: 'status', value: { 'in': [0, 1] } })

  return query
}
