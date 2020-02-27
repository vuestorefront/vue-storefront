import useCategory from './../../src/useCategory';
import { usePersistedState } from '@vue-storefront/utils';

const product = (name, slug, id) => ({
  masterData: {
    current: {
      name,
      slug,
      masterVariant: {
        id
      },
      categoriesRef: [{ id: 'aaa' }],
      allVariants: [{ id: '123' }, { id: '456' }, { id: '789' }]
    }
  }
});

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
    }),
  getProduct: () =>
    Promise.resolve({
      data: {
        products: {
          results: [
            product('prod1', 'prod-1', 'sde213'),
            product('prod2', 'prod-2', 'sde456'),
            product('prod3', 'prod-3', 'sde789')
          ]
        }
      }
    })
}));

describe('[commercetools-composables] useCategory', () => {
  it('creates properties', () => {
    const { categories, appliedFilters, loading, error } = useCategory('test-category');

    expect(categories.value).toEqual([]);
    expect(appliedFilters.value).toEqual(null);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual(null);
  });

  it('returns category response with the products inside', async () => {
    const { search, categories, loading } = useCategory('test-use-category');

    expect(loading.value).toBeFalsy();
    await search({ slug: 'category-slug' });

    expect(categories.value).toEqual([
      { _products: [],
        id: 'bbb',
        name: 'cat1' },
      {
        _products: [
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod1',
            _slug: 'prod-1',
            id: '123' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod1',
            _slug: 'prod-1',
            id: '456' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod1',
            _slug: 'prod-1',
            id: '789' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod2',
            _slug: 'prod-2',
            id: '123' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod2',
            _slug: 'prod-2',
            id: '456' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod2',
            _slug: 'prod-2',
            id: '789' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod3',
            _slug: 'prod-3',
            id: '123' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod3',
            _slug: 'prod-3',
            id: '456' },
          { _categoriesRef: ['aaa'],
            _master: false,
            _name: 'prod3',
            _slug: 'prod-3',
            id: '789' }
        ],
        id: 'aaa',
        name: 'cat2'
      },
      { _products: [],
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

  it.skip('applies filter', async () => {
    const { applyFilter } = useCategory('test-use-category');

    applyFilter();
  });

  it.skip('clear filters', async () => {
    const { clearFilters } = useCategory('test-use-category');

    clearFilters();
  });
});
