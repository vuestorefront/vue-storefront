import { getCategoryByPath } from '@vue-storefront/about-you-api';
import { mapCategorySearchByPathParams } from '../../../src/helpers';
import { params } from '../../../src/composables/useCategory/factoryParams';

jest.mock('../../../src/helpers', () => ({
  mapCategorySearchByPathParams: jest.fn()
}));
jest.mock('@vue-storefront/about-you-api', () => ({
  getCategoryByPath: jest.fn(async () => {})
}));

describe('[about-you-composables] useCategory factoryParams', () => {
  it('categorySearch returns array of categories', async () => {
    const categorySearchParams = {
      path: '/foo',
      with: {
        children: 2
      }
    };
    const expectedCategories = [
      {categoryId: 123}
    ];

    (mapCategorySearchByPathParams as jest.Mock).mockReturnValueOnce(categorySearchParams);
    (getCategoryByPath as jest.Mock).mockReturnValueOnce(expectedCategories[0]);

    expect(await params.categorySearch(categorySearchParams, null)).toEqual(expectedCategories);
  });
});
