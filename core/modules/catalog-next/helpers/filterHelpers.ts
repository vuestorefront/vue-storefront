import config from 'config'
import FilterVariant from 'core/modules/catalog-next/types/FilterVariant'

export const getSystemFilterNames: string[] = config.products.systemFilterNames

/**
 * Creates new filtersQuery (based on currentQuery) by modifying specific filter variant.
 */
export const changeFilterQuery = ({currentQuery = {}, filterVariant}: {currentQuery?: any, filterVariant?: FilterVariant} = {}) => {
  const newQuery = JSON.parse(JSON.stringify(currentQuery))
  if (!filterVariant) return newQuery
  if (getSystemFilterNames.includes(filterVariant.type)) {
    if (newQuery[filterVariant.type] && newQuery[filterVariant.type] === filterVariant.id) {
      delete newQuery[filterVariant.type]
    } else {
      newQuery[filterVariant.type] = filterVariant.id
    }
  } else {
    let queryFilter = newQuery[filterVariant.type] || []
    if (!Array.isArray(queryFilter)) queryFilter = [queryFilter]
    if (queryFilter.includes(filterVariant.id)) {
      queryFilter = queryFilter.filter(value => value !== filterVariant.id)
    } else if (filterVariant.single) {
      queryFilter = [filterVariant.id]
    } else {
      queryFilter.push(filterVariant.id)
    }
    // delete or add filter variant to query
    if (!queryFilter.length) delete newQuery[filterVariant.type]
    else newQuery[filterVariant.type] = queryFilter
  }
  return newQuery
}

export const getFiltersFromQuery = ({filtersQuery = {}, availableFilters = {}} = {}) => {
  const searchQuery = {
    filters: {}
  }
  Object.keys(filtersQuery).forEach(filterKey => {
    const filter = availableFilters[filterKey]
    const queryValue = filtersQuery[filterKey]
    if (!filter) return
    if (getSystemFilterNames.includes(filterKey)) {
      searchQuery[filterKey] = queryValue
    } else if (Array.isArray(queryValue)) {
      queryValue.map(singleValue => {
        const variant = filter.find(filterVariant => filterVariant.id === singleValue)
        if (!variant) return
        if (!searchQuery.filters[filterKey] || !Array.isArray(searchQuery.filters[filterKey])) searchQuery.filters[filterKey] = []
        searchQuery.filters[filterKey].push({...variant, attribute_code: filterKey})
      })
    } else {
      const variant = filter.find(filterVariant => filterVariant.id === queryValue)
      if (!variant) return
      searchQuery.filters[filterKey] = {...variant, attribute_code: filterKey}
    }
  })
  return searchQuery
}
