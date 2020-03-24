import enhanceProduct from './../../src/helpers/internals/enhanceProduct';

const product = (name, slug, id) => ({
  masterData: {
    current: {
      name,
      slug,
      masterVariant: {
        id
      },
      categoriesRef: [{ id: 'aaa' }],
      allVariants: [
        { id: '123' },
        { id: '456' },
        { id: '789' }
      ]
    }
  }
});

const productResponse = {
  data: {
    products: {
      results: [
        product('prod1', 'prod-1', 'sde213'),
        product('prod2', 'prod-2', '34s42d'),
        product('prod3', 'prod-3', 'fdf334'),
        product('prod4', 'prod-4', 'dfsdf3')
      ]
    }
  }
} as any;

describe('[commercetools-composables] enhanceProduct', () => {
  it('returns category response with the products inside', () => {
    expect(enhanceProduct(productResponse)).toEqual({
      data: {
        products: {
          results: [
            product('prod1', 'prod-1', 'sde213'),
            product('prod2', 'prod-2', '34s42d'),
            product('prod3', 'prod-3', 'fdf334'),
            product('prod4', 'prod-4', 'dfsdf3')
          ]
        },
        _variants: [
          { id: '123',
            _name: 'prod1',
            _slug: 'prod-1',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '456',
            _name: 'prod1',
            _slug: 'prod-1',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '789',
            _name: 'prod1',
            _slug: 'prod-1',
            _master: false,
            _categoriesRef: ['aaa'] },

          { id: '123',
            _name: 'prod2',
            _slug: 'prod-2',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '456',
            _name: 'prod2',
            _slug: 'prod-2',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '789',
            _name: 'prod2',
            _slug: 'prod-2',
            _master: false,
            _categoriesRef: ['aaa'] },

          { id: '123',
            _name: 'prod3',
            _slug: 'prod-3',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '456',
            _name: 'prod3',
            _slug: 'prod-3',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '789',
            _name: 'prod3',
            _slug: 'prod-3',
            _master: false,
            _categoriesRef: ['aaa'] },

          { id: '123',
            _name: 'prod4',
            _slug: 'prod-4',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '456',
            _name: 'prod4',
            _slug: 'prod-4',
            _master: false,
            _categoriesRef: ['aaa'] },
          { id: '789',
            _name: 'prod4',
            _slug: 'prod-4',
            _master: false,
            _categoriesRef: ['aaa'] }
        ]
      }
    });
  });
});
