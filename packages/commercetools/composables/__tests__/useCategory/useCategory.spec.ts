import useCategory from './../../src/useCategory';

const categoriesResult = [
  { name: 'cat1',
    id: 'bbb' },
  { name: 'cat2',
    id: 'aaa' },
  { name: 'cat3',
    id: 'fcd' }
];

jest.mock('@vue-storefront/core', () => ({
  useCategoryFactory: (params) => () => params
}));

const context = {
  $ct: {
    api: {
      getCategory: jest.fn(() =>
        Promise.resolve({
          data: {
            categories: {
              results: categoriesResult
            }
          }
        }))
    }
  }
};

describe('[commercetools-composables] useCategory', () => {
  it('loads categories', async () => {
    const { categorySearch } = useCategory('test-category') as any;

    const response = await categorySearch(context, { searchParams: { catId: 'xxx1' } });

    expect(response).toEqual(categoriesResult);
    expect(context.$ct.api.getCategory).toBeCalledWith({ catId: 'xxx1' }, undefined);
  });
});
