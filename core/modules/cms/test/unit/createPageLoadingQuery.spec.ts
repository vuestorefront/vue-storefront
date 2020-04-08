import createPageLoadingQuery from '../../helpers/createPageLoadingQuery'

describe('createPageLoadingQuery', () => {
  it('should return page loading query with applied proper filters', () => {
    const filter = { filterField: 'test', filterValues: ['test1', 'test2'] }

    let pageLoadingQuery = createPageLoadingQuery(filter)
    let [ appliedFilter ] = pageLoadingQuery.getAppliedFilters()

    expect(appliedFilter).toHaveProperty('attribute', filter.filterField)
    expect(appliedFilter).toHaveProperty('value', { like: filter.filterValues })
  })

  it('should return page loading query with base hierarchy if filter values are not provided', () => {
    const filter = { filterField: 'test', filterValues: undefined }
    let pageLoadingQuery = createPageLoadingQuery(filter)

    expect(pageLoadingQuery).toEqual({ _availableFilters: [], _appliedFilters: [], _appliedSort: [], _searchText: '' })
  })
})
