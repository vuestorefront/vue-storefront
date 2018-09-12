export function prepareGraphQlBody (Query) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query

  let query = ``
  let queryVariables = {}
  const filters = Query.searchQuery.getAppliedFilters()

  switch (Query.type) {
    case 'product':
      query = require('./queries/products.gql')
      queryVariables.search = Query.searchQuery.getSearchText()
      break
    case 'attribute':
      query = require('./queries/customAttributeMetadata.gql')
      break
    case 'category':
      query = require('./queries/categories.gql')
      break
    case 'taxrule':
      query = require('./queries/taxrule.gql')
      break
  }

  queryVariables.sort = {}
  queryVariables.filter = {}

  // Add aggregations for filters
  const allFilters = Query.searchQuery.getAvailableFilters()
  if (allFilters.length > 0) {
    for (let attrToFilter of allFilters) {
      queryVariables.filter[attrToFilter.field] = {}
      if (typeof attrToFilter.scope !== 'undefined') {
        queryVariables.filter[attrToFilter.field]['scope'] = attrToFilter.scope
      }
    }
  }

  for (let _filter of filters) {
    if (_filter.scope) {
      _filter.value['scope'] = _filter.scope
      delete (_filter.scope)
    }
    let processedFilter = processNestedFieldFilter(_filter)
    queryVariables.filter = Object.assign(queryVariables.filter, processedFilter)
  }

  if (Query.sort !== '') {
    const sortParse = Query.sort.split(':')
    queryVariables.sort[sortParse[0]] = sortParse[1].toUpperCase()
  }

  queryVariables.pageSize = Query.size
  queryVariables.currentPage = Query.from / Query.size + 1
  queryVariables.attributes = queryVariables.filter

  const body = JSON.stringify({
    query,
    variables: queryVariables
  })

  return body
}

function processNestedFieldFilter (filter) {
  let processedFilter = {}
  let filterAttributes = filter.attribute.split('.')
  if (filterAttributes.length > 1) {
    let nestedFilter = filter.value
    for (let i = filterAttributes.length - 1; i >= 0; i--) {
      nestedFilter = { [filterAttributes[i]]: nestedFilter }
    }
    processedFilter = nestedFilter
  } else {
    processedFilter[filter.attribute] = filter.value
  }
  return processedFilter
}
