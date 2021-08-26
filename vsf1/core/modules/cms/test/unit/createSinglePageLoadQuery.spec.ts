import createSinglePageLoadQuery from '../../helpers/createSinglePageLoadQuery'

describe('createSinglePageLoadQuery should', () => {
  it('return page loading query with applied proper filters', () => {
    const filter = { key: 'test', value: ['test1', 'test2'] }

    let singlePageMockQuery = createSinglePageLoadQuery(filter)
    let [ appliedFilter ] = singlePageMockQuery.getAppliedFilters()

    expect(appliedFilter).toHaveProperty('attribute', filter.key)
    expect(appliedFilter).toHaveProperty('value', { like: filter.value })
  })

  it('return page loading query with base hierarchy if value is not provided', () => {
    const filter = { key: 'test', value: undefined }
    let singlePageMockQuery = createSinglePageLoadQuery(filter)

    expect(singlePageMockQuery).toEqual({ _availableFilters: [], _appliedFilters: [], _appliedSort: [], _searchText: '' })
  })
})
