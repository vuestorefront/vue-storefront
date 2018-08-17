import bodybuilder from 'bodybuilder'
import getBoosts from '../../boost'

export function prepareElasticsearchQueryBody (searchQuery) {
  const optionsPrfeix = '_options'
  const queryText = searchQuery.getSearchText()
  const rangeOperators = ['gt', 'lt', 'gte', 'lte', 'moreq', 'from', 'to']
  let query = bodybuilder()

  // process applied filters
  const appliedFilters = searchQuery.getAppliedFilters()
  if (appliedFilters.length > 0) {
    let hasCatalogFilters = false

    // apply default filters
    appliedFilters.forEach(filter => {
      if (filter.scope === 'default') {
        if (rangeOperators.every(rangeOperator => filter.value.hasOwnProperty(rangeOperator))) {
          // process range filters
          query = query.filter('range', filter.attribute, filter.value)
        } else {
          // process terms filters
          filter.value = filter.value[Object.keys(filter.value)[0]]
          if (!Array.isArray(filter.value)) {
            filter.value = [filter.value]
          }
          query = query.filter('terms', filter.attribute, filter.value)
        }
      } else if (filter.scope === 'catalog') {
        hasCatalogFilters = true
      }
    })

    // apply catalog scope filters

    let attrFilterBuilder = (filterQr, attrPostfix = '') => {
      for (let catalogfilter of appliedFilters) {
        if (catalogfilter.scope === 'catalog') {
          if (rangeOperators.every(rangeOperator => catalogfilter.value.hasOwnProperty(rangeOperator))) {
            // process range filters
            filterQr = filterQr.andFilter('range', catalogfilter.attribute, catalogfilter.value)
          } else {
            // process terms filters
            catalogfilter.value = catalogfilter.value[Object.keys(catalogfilter.value)[0]]
            if (!Array.isArray(catalogfilter.value)) {
              catalogfilter.value = [catalogfilter.value]
            }
            filterQr = filterQr.andFilter('terms', catalogfilter.attribute + attrPostfix, catalogfilter.value)
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

  // Add aggregations for catalog filters
  const allFilters = searchQuery.getAvailableFilters()
  if (allFilters.length > 0) {
    for (let attrToFilter of allFilters) {
      if (attrToFilter.scope === 'catalog') {
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
  }

  if (queryText !== '') {
    query = query.andQuery('bool', b => b.orQuery('match_phrase_prefix', 'name', { query: queryText, boost: getBoosts('name'), slop: 2 })
      .orQuery('match_phrase', 'category.name', { query: queryText, boost: getBoosts('category.name') })
      .orQuery('match_phrase', 'short_description', { query: queryText, boost: getBoosts('short_description') })
      .orQuery('match_phrase', 'description', { query: queryText, boost: getBoosts('description') })
      .orQuery('bool', b => b.orQuery('terms', 'sku', queryText.split('-'))
        .orQuery('terms', 'configurable_children.sku', queryText.split('-'))
        .orQuery('match_phrase', 'sku', { query: queryText, boost: getBoosts('sku') })
        .orQuery('match_phrase', 'configurable_children.sku', { query: queryText, boost: getBoosts('configurable_children.sku') }))
    )
  }

  const queryBody = query.build()
  return queryBody
}
