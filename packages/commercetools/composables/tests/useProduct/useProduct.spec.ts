import useProduct from '../../src/useProduct';

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
  getProduct: () =>
    Promise.resolve({
      data: {
        products: {
          results: [
            product('prod1', 'prod-1', 'sde213')
          ]
        }
      }
    })
}));

describe('[commercetools-composables] useProduct', () => {
  it('creates properties', () => {
    const { products, loading, error } = useProduct('test-product');

    expect(products.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(error.value).toEqual(null);
  });

  it('returns product response', async () => {
    const { search, products } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([
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
        id: '789' }
    ]);
  });
});
