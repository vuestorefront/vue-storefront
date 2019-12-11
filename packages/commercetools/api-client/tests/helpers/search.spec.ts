import { buildProductWhere } from 'api-client/src/helpers/search'

describe('[commercetools-api-client] search', () => {
  it('returns empty string when parameters is not supperted', () => {
    expect(buildProductWhere({})).toBe('')
  })

  it('returns search query by cat id', () => {
    expect(buildProductWhere({ catId: "cat id" })).toBe('masterData(current(categories(id="cat id")))')
  })
})
