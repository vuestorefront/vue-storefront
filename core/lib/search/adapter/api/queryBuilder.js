import getFunctionScores from './elasticsearch/score'
import getMultiMatchConfig from './elasticsearch/multimatch'
import getBoosts from './elasticsearch/boost'
import getMapping from './elasticsearch/mapping'
import cloneDeep from 'lodash-es/cloneDeep'
import map from 'lodash-es/map';

function processNestedFieldFilter (attribute, value) {
  let processedFilter = {
    'attribute': attribute,
    'value': value
  };
  let filterAttributeKeys = Object.keys(value);
  for (let filterAttributeKey of filterAttributeKeys) {
    if (value[filterAttributeKey] && !Array.isArray(value[filterAttributeKey]) && typeof value[filterAttributeKey] === 'object') {
      processedFilter = processNestedFieldFilter(attribute + '.' + filterAttributeKey, value[filterAttributeKey]);
    }
  }
  return processedFilter;
}

/**
 *
 * @param {Object} object
 * @param {String} scope
 * @returns {boolean}
 */
function checkIfObjectHasScope ({ object, scope }) {
  return object.scope === scope || (Array.isArray(object.scope) && object.scope.find(scrope => scrope === scope));
}

export function applySearchQuery (config, queryText, query) {
  let getQueryBody = function (b) {
    let searchableAttributes = config.elasticsearch.hasOwnProperty('searchableAttributes') ? config.elasticsearch.searchableAttributes : { 'name': { 'boost': 1 } };
    let searchableFields = []
    for (const attribute of Object.keys(searchableAttributes)) {
      searchableFields.push(attribute + '^' + getBoosts(config, attribute));
    }
    return b.orQuery('multi_match', 'fields', searchableFields, getMultiMatchConfig(config, queryText))
      .orQuery('bool', b => b.orQuery('terms', 'configurable_children.sku', queryText.split('-'))
        .orQuery('match_phrase', 'sku', { query: queryText, boost: 1 })
        .orQuery('match_phrase', 'configurable_children.sku', { query: queryText, boost: 1 }));
  };
  if (queryText !== '') {
    let functionScore = getFunctionScores(config);
    // Build bool or function_scrre accordingly
    if (functionScore) {
      query = query.query('function_score', functionScore, getQueryBody);
    } else {
      query = query.query('bool', getQueryBody);
    }
  }
  return query;
}

export async function buildQueryBodyFromSearchQuery (config, bodybuilder, searchQuery) {
  const optionsPrefix = '_options'
  const queryText = searchQuery.getSearchText()
  const rangeOperators = ['gt', 'lt', 'gte', 'lte', 'moreq', 'from', 'to']
  let query = bodybuilder.default()

  // process applied filters
  const appliedFilters = cloneDeep(searchQuery.getAppliedFilters()) // copy as function below modifies the object
  if (appliedFilters.length > 0) {
    let hasCatalogFilters = false
    // apply default filters
    appliedFilters.forEach(filter => {
      if (checkIfObjectHasScope({ object: filter, scope: 'default' }) && Object.keys(filter.value).length) {
        if (Object.keys(filter.value).every(v => rangeOperators.includes(v))) {
          // process range filters
          query = query.filter('range', filter.attribute, filter.value)
        } else {
          // process terms filters
          const operator = Object.keys(filter.value)[0]
          filter.value = filter.value[Object.keys(filter.value)[0]]
          if (!Array.isArray(filter.value) && filter.value !== null) {
            filter.value = [filter.value]
          }
          if (operator === 'or') {
            if (filter.value === null) {
              query = query.orFilter('bool', (b) => {
                return b.notFilter('exists', getMapping(config, filter.attribute))
              })
            } else {
              query = query.orFilter('terms', getMapping(config, filter.attribute), filter.value)
            }
          } else {
            if (filter.value === null) {
              query = query.filter('exists', getMapping(config, filter.attribute))
            } else {
              query = query.filter('terms', getMapping(config, filter.attribute), filter.value)
            }
          }
        }
      } else if (filter.scope === 'catalog') {
        hasCatalogFilters = true
      }
    })

    // apply catalog scope filters
    let attrFilterBuilder = (filterQr, attrPostfix = '') => {
      appliedFilters.forEach(catalogfilter => {
        const valueKeys = Object.keys(catalogfilter.value)
        if (checkIfObjectHasScope({ object: catalogfilter, scope: 'catalog' }) && valueKeys.length) {
          const isRange = valueKeys.filter(value => rangeOperators.indexOf(value) !== -1)
          if (isRange.length) {
            let rangeAttribute = catalogfilter.attribute
            // filter by product fiunal price
            if (rangeAttribute === 'price') {
              rangeAttribute = config.products.priceFilterKey
            }
            // process range filters
            filterQr = filterQr.andFilter('range', rangeAttribute, catalogfilter.value)
          } else {
            // process terms filters
            let newValue = catalogfilter.value[Object.keys(catalogfilter.value)[0]]
            if (!Array.isArray(newValue)) {
              newValue = [newValue]
            }
            if (attrPostfix === '') {
              filterQr = filterQr.andFilter('terms', getMapping(config, catalogfilter.attribute), newValue)
            } else {
              filterQr = filterQr.andFilter('terms', catalogfilter.attribute + attrPostfix, newValue)
            }
          }
        }
      })
      return filterQr
    }

    if (hasCatalogFilters) {
      query = query.filterMinimumShouldMatch(1).orFilter('bool', attrFilterBuilder)
        .orFilter('bool', (b) => attrFilterBuilder(b, optionsPrefix).filter('match', 'type_id', 'configurable')) // the queries can vary based on the product type
    }
  }

  // Add aggregations for catalog filters
  const allFilters = searchQuery.getAvailableFilters()
  if (allFilters.length > 0) {
    for (let attrToFilter of allFilters) {
      if (checkIfObjectHasScope({ object: attrToFilter, scope: 'catalog' })) {
        if (attrToFilter.field !== 'price') {
          let aggregationSize = { size: config.products.filterAggregationSize[attrToFilter.field] || config.products.filterAggregationSize.default }
          query = query.aggregation('terms', getMapping(config, attrToFilter.field), aggregationSize)
          query = query.aggregation('terms', attrToFilter.field + optionsPrefix, aggregationSize)
        } else {
          query = query.aggregation('terms', attrToFilter.field)
          query.aggregation('range', 'price', config.products.priceFilters)
        }
      }
    }
  }
  // Get searchable fields based on user-defined config.
  query = applySearchQuery(config, queryText, query)
  const queryBody = query.build()
  if (searchQuery.suggest) {
    queryBody.suggest = searchQuery.suggest
  }

  return queryBody
}
export function applySort (sort, query) {
  if (sort) {
    map(sort, (value, key) => {
      query.sort(key, value);
    });
  }

  return query;
}

/**
 * Build a query from unified query object (as known from `storefront-api`) - eg:
 * {
 *   "type_id": { "eq": "configurable "}
 * }
 */
export async function buildQueryBodyFromFilterObject (type, config, bodybuilder, filter, search = '') {
  const appliedFilters = [];
  if (filter) {
    for (var attribute in filter) {
      let processedFilter = processNestedFieldFilter(attribute, filter[attribute])
      let appliedAttributeValue = processedFilter['value']
      const scope = appliedAttributeValue.scope || 'default';
      delete appliedAttributeValue.scope;
      appliedFilters.push({
        attribute: processedFilter['attribute'],
        value: appliedAttributeValue,
        scope: scope
      });
    }
  }
  return buildQueryBodyFromSearchQuery({
    _appliedFilters: appliedFilters,
    _availableFilters: appliedFilters,
    _searchText: search
  }, config, bodybuilder)
}
