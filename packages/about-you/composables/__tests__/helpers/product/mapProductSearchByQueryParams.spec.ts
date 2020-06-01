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

  it('returns mapped products query for given search params', async () => {
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

  it('returns mapped products query for given filters', async () => {
    const params = {
      filters: {
        prices: {
          id: null,
          name: 'Prices',
          options: [
            {
              max: 10910,
              min: 10000,
              productCount: 4,
              selected: false
            }
          ],
          slug: 'prices',
          type: 'range'
        },
        country: {
          id: 1337,
          name: 'Country',
          options: [
            {
              id: 73349,
              name: 'Germany',
              productCount: 1,
              selected: true
            }
          ],
          slug: 'country',
          type: 'attributes'
        }
      }
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
        attributes: [
          {
            key: 'prices',
            type: 'attributes',
            values: []
          },
          {
            key: 'country',
            type: 'attributes',
            values: [73349]
          }
        ],
        maxPrice: 10910,
        minPrice: 10000
      },
      sort: {},
      pagination: {}
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
