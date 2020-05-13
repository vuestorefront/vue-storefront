import useCategory from '../../../src/composables/useCategory';
import { useCategoryFactory } from '@vue-storefront/core';
import { params } from '../../../src/composables/useCategory/factoryParams';

jest.mock('@vue-storefront/core', () => ({
  useCategoryFactory: jest.fn(() => categoryId => ({categoryId}))
}));

jest.mock('../../../src/composables/useCategory/factoryParams', () => ({
  params: {}
}));

describe('[about-you-composables] useCategory', () => {
  it('returns useUserFactory functions', () => {
    expect(useCategoryFactory).toHaveBeenCalledWith(params);
    expect(useCategory('category-id')).toEqual({categoryId: 'category-id'});
  });
});
