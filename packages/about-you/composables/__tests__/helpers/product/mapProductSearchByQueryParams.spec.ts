import { mapProductSearchByQueryParams } from '../../../src/helpers/product/mapProductSearchByQueryParams';

describe('[about-you-helpers] mapProductSearchByQueryParams', () => {
  it('returns products query with default attrs when given no params', async () => {
    const params = {};
    const expectedQuery = {
      with: {
        advancedAttributes: 'all',
        attributes: 'all',
        categories: 'all',
        images: 'all',
        priceRange: true,
        siblings: 'all',
        variants: 'all'
      },
      where: {},
      sort: {},
      pagination: {}
    };

    const result = mapProductSearchByQueryParams(params);
    expect(result).toEqual(expectedQuery);
  });

  it('returns mapped products query for given params', async () => {
    const params = {
      catId: 1337,
      term: 'foo',
      page: 2,
      perPage: 20,
      sort: 'price-asc'
    };
    const expectedQuery = {
      with: {
        advancedAttributes: 'all',
        attributes: 'all',
        categories: 'all',
        images: 'all',
        priceRange: true,
        siblings: 'all',
        variants: 'all'
      },
      where: {
        categoryId: params.catId,
        term: params.term
      },
      sort: {
        by: 'price',
        direction: 'asc'
      },
      pagination: {
        page: params.page,
        perPage: params.perPage
      }
    };

    const result = mapProductSearchByQueryParams(params);
    expect(result).toEqual(expectedQuery);
  });

  it('returns only by sort params if not contains "-"', () => {
    const params = { sort: 'price' };
    const result = mapProductSearchByQueryParams(params);
    expect(result.sort).toEqual({by: 'price'});
  });
});
