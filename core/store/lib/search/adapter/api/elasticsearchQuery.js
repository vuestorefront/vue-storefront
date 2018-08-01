import bodybuilder from 'bodybuilder'
import getBoosts from '../../boost'

export function prepareElasticsearchQueryBody (searchQuery) {
  const optionsPrfeix = '_options'
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

  // process applied filters
  const appliedFilters = searchQuery.getAppliedFilters()
  if (appliedFilters.length > 0) {
    let hasCatalogFilters = false
    // apply default filters
    appliedFilters.forEach(function (_filter) {
      if (_filter.scope === 'default') {
        switch (_filter.type) {
          case 'range':
            query = query.filter(_filter.type, _filter.attribute, _filter.value)
            break
          case 'term':
            query = query.filter('terms', _filter.attribute, [_filter.value])
            break
          case 'terms':
            if (_filter.value.constructor !== Array && _filter.value.constructor !== Object) {
              _filter.value = [_filter.value]
            }
            query = query.filter(_filter.type, _filter.attribute, _filter.value)
            break
          case 'match':
            if (_filter.value.constructor !== Array && _filter.value.constructor !== Object) {
              _filter.value = [_filter.value]
            }
            query = query.filter('terms', _filter.attribute, _filter.value)
            break
          default:
            console.log('Sorry, we do not suport ' + _filter.type + ' filter type')
        }
      } else if (_filter.scope === 'catalogsearch' || _filter.scope === 'catalog') {
        hasCatalogFilters = true
      }
    })

    // apply catalog filters

    let attrFilterBuilder = (filterQr, attrPostfix = '') => {
      for (let filter of appliedFilters) {
        if (filter.scope === 'catalogsearch' || filter.scope === 'catalog') {
          if (filter.attribute !== 'price' && filter.type !== 'range') {
            filterQr = filterQr.andFilter('match', filter.attribute + attrPostfix, filter.value)
          } else { // multi should be possible filter here?
            filterQr = filterQr.andFilter('range', filter.attribute, filter.value)
          }
        }
      }

      return filterQr
    }

    if (hasCatalogFilters) {
      query = query.orFilter('bool', (b) => attrFilterBuilder(b))
        .orFilter('bool', (b) => attrFilterBuilder(b, optionsPrfeix).filter('match', 'type_id', 'configurable')) // the queries can vary based on the product type
    }
  }

  // Add aggregations for filters
  const allFilters = searchQuery.getAvailableFilters()
  if (allFilters.length > 0) {
    for (let attrToFilter of allFilters) {
      if (attrToFilter.field !== 'price') {
        query = query.aggregation('terms', attrToFilter.field)
        query = query.aggregation('terms', attrToFilter.field + optionsPrfeix)
      } else {
        query = query.aggregation('terms', attrToFilter.field)
        query.aggregation('range', 'price', {
          ranges: [
            { from: 0, to: 50 },
            { from: 50, to: 100 },
            { from: 100, to: 150 },
            { from: 150 }
          ]
        })
      }
    }
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
