import createLoadingBlockQuery from '../../helpers/createLoadingBlockQuery'

describe('createLoadingBlockQuery', () => {
  it('should return loading block query with applied proper filters', () => {
    const filter = { filterField: 'test', filterValues: ['test1', 'test2'] }

    let loadingBlockQuery = createLoadingBlockQuery(filter)
    let [ appliedFilter ] = loadingBlockQuery.getAppliedFilters()

    expect(appliedFilter).toHaveProperty('attribute', filter.filterField)
    expect(appliedFilter).toHaveProperty('value', { like: filter.filterValues })
  })

  it('should return loading block query object with base hierarchy if filter values are not provided', () => {
    const filter = { filterField: 'test', filterValues: undefined }
    let loadingBlockQuery = createLoadingBlockQuery(filter)

    expect(loadingBlockQuery).toEqual({ _availableFilters: [], _appliedFilters: [], _appliedSort: [], _searchText: '' })
  })
})
