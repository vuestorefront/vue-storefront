import { mapProductSearchByQueryParams } from '../../../src/helpers/product/mapProductSearchByQueryParams';

describe('[about-you-helpers] mapProductSearchByQueryParams', () => {
  it('returns empty products query given no params', async () => {
    const params = {};
    const expectedQuery = {
      with: {},
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
      perPage: 20
    };
    const expectedQuery = {
      with: {},
      where: {
        categoryId: params.catId,
        term: params.term
      },
      sort: {},
      pagination: {
        page: params.page,
        perPage: params.perPage
      }
    };

    const result = mapProductSearchByQueryParams(params);
    expect(result).toEqual(expectedQuery);
  });
});
