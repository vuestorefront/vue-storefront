import createSingleBlockQuery from '../../helpers/createSingleBlockQuery'

describe('createSingleBlockLoadQuery should', () => {
  it('return single block load query with applied proper filters', () => {
    const argsMock = { key: 'test', value: ['test1', 'test2'] }

    let mockSingleBlockQuery = createSingleBlockQuery(argsMock)
    let [ appliedFilter ] = mockSingleBlockQuery._appliedFilters

    expect(appliedFilter).toHaveProperty('attribute', argsMock.key)
    expect(appliedFilter).toHaveProperty('value', { like: argsMock.value })
  })

  it('return create single block load query with base hierarchy if value is not provided', () => {
    const argsMock = { key: 'test', value: undefined }
    let mockSingleBlockQuery = createSingleBlockQuery(argsMock)

    expect(mockSingleBlockQuery).toEqual({ _availableFilters: [], _appliedFilters: [], _searchText: '' })
  })
})
