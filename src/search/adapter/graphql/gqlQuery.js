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

export function prepareQueryVars (Request) {
  let queryVariables = {}
  const filters = typeof Request.searchQuery.getAppliedFilters !== 'undefined' ? Request.searchQuery.getAppliedFilters() : {}

  queryVariables.search = Request.searchQuery.getSearchText()
  queryVariables.sort = {}
  queryVariables.filter = {}
  queryVariables._sourceInclude = {}
  queryVariables._sourceExclude = {}

  // Add aggregations for filters
  const allFilters = Request.searchQuery.getAvailableFilters()
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

  if (Request.sort !== '') {
    const sortParse = Request.sort.split(':')
    if (sortParse[1] !== undefined) {
      queryVariables.sort[sortParse[0]] = sortParse[1].toUpperCase()
    } else {
      if (sortParse[0] === '_score') {
        queryVariables.sort[sortParse[0]] = 'DESC'
      } else {
        queryVariables.sort[sortParse[0]] = 'ASC'
      }
    }
  }

  queryVariables.pageSize = Request.size
  queryVariables.currentPage = Request.from / Request.size + 1
  queryVariables.attributes = queryVariables.filter
  queryVariables._sourceInclude = Request._sourceInclude
  queryVariables._sourceExclude = Request._sourceExclude

  return queryVariables
}

export function prepareGraphQlBody (Request) {
  // @TODO Create graphQl query builder uses gqlQuery.body params
  // below is a simple demo test products search query

  let query = ``
  let queryVariables = prepareQueryVars(Request)
  switch (Request.type) {
    case 'product':
      query = require('./queries/products.gql')
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
    case 'cms_page':
      query = require('./queries/cmsPage.gql')
      break
    case 'cms_block':
      query = require('./queries/cmsBlock.gql')
      break
    case 'cms_hierarhy':
      query = require('./queries/cmsHierarchy.gql')
      break
  }

  const body = JSON.stringify({
    query,
    variables: queryVariables
  })

  return body
}
