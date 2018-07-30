import bodybuilder from 'bodybuilder'
import getBoosts from '../../boost'

export function prepareElasticsearchQueryBody (searchQuery) {
  const queryText = searchQuery.getSearchText()
  let query = bodybuilder()

  const queriesList = searchQuery.getQueries()
  if (queriesList.length > 0) {
    queriesList.forEach(function (_query) {
      if (Object.keys(_query.value).length !== 0 && _query.value.constructor === Object) {
        if (_query.value.hasOwnProperty('query')) {
          _query.value.boost = getBoosts(_query.attribute)
        }
      }

      if (_query.value) {

      } else {

      }
      switch (_query.boolType) {
        case 'query':
          query = query.query(_query.type, _query.attribute, _query.value)
          break
        case 'orQuery':
          query = query.orQuery(_query.type, _query.attribute, _query.value)
          break
        case 'andQuery':
          query = query.andQuery(_query.type, _query.attribute, _query.value)
          break
        case 'notQuery':
          query = query.notQuery(_query.type, _query.attribute, _query.value)
          break
        default:
          console.log('Sorry, we do not suport ' + _query.boolType + ' query type')
      }
    })
  }

  const filtersList = searchQuery.getFilters()
  if (filtersList.length > 0) {
    filtersList.forEach(function (_filter) {
      switch (_filter.type) {
        case 'range':
          query = query.filter(_filter.type, _filter.attribute, _filter.value)
          break
        case 'term':
          query = query.filter(_filter.type, _filter.attribute, _filter.value)
          break
        default:
          console.log('Sorry, we do not suport ' + _filter.type + ' filter type')
      }
    })
  }

  const aggregationsList = searchQuery.getAggregations()
  if (aggregationsList.length > 0) {
    aggregationsList.forEach(function (_aggregation) {
      query = query.aggregation(_aggregation.type, _aggregation.field, _aggregation.options, _aggregation.name, _aggregation.subaggregations)
    })
  }

  if (queryText !== '') {
    query = query.andQuery(
      'bool',
      b => b.orQuery('match', 'name', { query: queryText, boost: getBoosts('name') })
        .orQuery('match', 'category.name', { query: queryText, boost: getBoosts('category.name') })
        .orQuery('match', 'sku', { query: queryText, boost: getBoosts('sku') })
        .orQuery('match', 'configurable_children.sku', { query: queryText, boost: getBoosts('configurable_children.sku') })
        .orQuery('match', 'short_description', { query: queryText, boost: getBoosts('short_description') })
        .orQuery('match', 'description', { query: queryText, boost: getBoosts('description') })
    )
  }

  const queryBody = query.build()

  console.log(queryBody)

  return queryBody
}
