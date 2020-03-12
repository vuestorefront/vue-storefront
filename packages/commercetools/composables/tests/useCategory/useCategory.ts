import useCategory from './../../src/useCategory';
import { usePersistedState } from '@vue-storefront/utils';

jest.mock('@vue-storefront/commercetools-api', () => ({
  getCategory: () =>
    Promise.resolve({
      data: {
        categories: {
          results: [
            { name: 'cat1',
              id: 'bbb' },
            { name: 'cat2',
              id: 'aaa' },
            { name: 'cat3',
              id: 'fcd' }
          ]
        }
      }
    })
}));

describe.skip('[commercetools-composables] useCategory', () => {
  it('creates properties', () => {
    const { categories, loading } = useCategory('test-category');

    expect(categories.value).toEqual([]);
    expect(loading.value).toEqual(false);
  });

  it('returns category response', async () => {
    const { search, categories, loading } = useCategory('test-use-category');

    expect(loading.value).toBeFalsy();
    await search({ slug: 'category-slug' });

    expect(categories.value).toEqual([
      {
        id: 'bbb',
        name: 'cat1' },
      {
        id: 'aaa',
        name: 'cat2'
      },
      {
        id: 'fcd',
        name: 'cat3' }
    ]);

    expect(loading.value).toBeFalsy();
  });

  it('does not trigger loading when there are categories', () => {
    (usePersistedState as any).mockImplementation(() => ({
      state: [1],
      persistedResource: async (fn, params) => fn(params)
    }));

    const { search, loading } = useCategory('test-use-category');
    expect(loading.value).toBeFalsy();
    search({ slug: 'category-slug' });
    expect(loading.value).toBeFalsy();
  });
});
