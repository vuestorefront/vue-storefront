import createHierarchyLoadQuery from '../../helpers/createHierarchyLoadQuery'

describe('createHierarchyLoadQuery', () => {
  it('should return hierarchic load query obj with applied filters if id is provided', () => {
    const filter = { id: 3 }
    let loadQuery = createHierarchyLoadQuery(filter)

    expect(loadQuery).toHaveProperty('_availableFilters')
    expect(loadQuery).toHaveProperty('_searchText')

    let [ appliedFilter ] = loadQuery._appliedFilters

    expect(appliedFilter).toHaveProperty('value', { eq: filter.id })
    expect(appliedFilter).toHaveProperty('attribute', 'identifier')
    expect(appliedFilter).toHaveProperty('scope')
    expect(appliedFilter).toHaveProperty('options')
  })

  it('should return load query obj with base hierarchy if id is not provided', () => {
    const filter = { id: null }
    let hierarchyLoadQuery = createHierarchyLoadQuery(filter)

    expect(hierarchyLoadQuery).toEqual({ _availableFilters: [], _appliedFilters: [], _searchText: '' })
  })
})
