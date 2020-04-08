import {
  buildProductWhere,
  buildCategoryWhere,
  buildOrderWhere
} from './../../src/helpers/search';

describe('[commercetools-api-client] search', () => {
  it('returns undefined when parameters are not supported', () => {
    expect(buildProductWhere(null)).toBe('');
  });

  it('returns undefined string when parameters are not supported', () => {
    expect(buildCategoryWhere(null)).toBe('');
  });

  it('returns undefined string when parameters are not supported', () => {
    expect(buildOrderWhere(null)).toBe(null);
  });

  it('returns product search query by cat id', () => {
    expect(buildProductWhere({ catId: ['cat id'] })).toBe('masterData(current(categories(id in ("cat id"))))');
  });

  it('returns category search query by id', () => {
    expect(buildCategoryWhere({ catId: 'cat id' })).toBe('id="cat id"');
  });

  it('returns category search query by slug', () => {
    expect(buildCategoryWhere({ slug: 'cat slug' })).toBe('slug(en="cat slug")');
  });

  it('returns product search query by slug', () => {
    expect(buildProductWhere({ slug: 'product-slug' })).toBe('masterData(current(slug(en="product-slug")))');
  });

  it('returns product search query by id', () => {
    expect(buildProductWhere({ id: 'product-id' })).toBe('id="product-id"');
  });

  it('returns order search query by id', () => {
    expect(buildOrderWhere({ id: 'orderid' })).toBe('id="orderid"');
  });

});
