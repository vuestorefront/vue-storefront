import { mapCategorySearchByPathParams } from '../../../src/helpers/category/mapCategorySearchByPathParams';

describe('[about-you-helpers] mapCategorySearchByPathParams', () => {
  it('returns empty products query given no params', async () => {
    const params = {};
    const expectedQuery = {};

    const result = mapCategorySearchByPathParams(params);
    expect(result).toEqual(expectedQuery);
  });

  it('returns mapped products query for given params', async () => {
    const params = {
      with: {
        parents: 'all',
        children: 2
      }
    };
    const expectedQuery = {
      with: {
        parents: params.with.parents,
        children: params.with.children
      }
    };

    const result = mapCategorySearchByPathParams(params);
    expect(result).toEqual(expectedQuery);
  });
});
