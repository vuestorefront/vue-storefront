import { buildProductWhere, buildCategoryWhere } from './../../src/helpers/search'

describe('[commercetools-api-client] search', () => {
  it('returns empty string when parameters is not supperted', () => {
    expect(buildProductWhere({})).toBe('')
  })

  it('returns product search query by cat id', () => {
    expect(buildProductWhere({ catId: "cat id" })).toBe('masterData(current(categories(id="cat id")))')
  })

  it('returns category search query by id', () => {
    expect(buildCategoryWhere({ catId: "cat id" })).toBe('id="cat id"')
  })

  it('returns category search query by slug', () => {
    expect(buildCategoryWhere({ slug: "cat slug" })).toBe('slug(en="cat slug")')
  })
})
