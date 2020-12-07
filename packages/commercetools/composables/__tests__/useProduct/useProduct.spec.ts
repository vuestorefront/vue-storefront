import useProduct from '../../src/useProduct';
import enhanceProducts from './../../src/helpers/internals/enhanceProduct';

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

const productResponse = {
  data: {
    products: {
      total: 54,
      results: [
        product('prod1', 'prod-1', 'sde213')
      ]
    },
    _variants: [product('prod1', 'prod-1', 'xxx1'), product('prod2', 'prod-2', 'xxx2')]
  }
};

jest.mock('./../../src/helpers/internals/enhanceProduct', () => jest.fn((args) => args));

jest.mock('@vue-storefront/core', () => ({
  useProductFactory: (params) => () => params
}));

const context = {
  $ct: {
    api: {
      getProduct: jest.fn(() => Promise.resolve(productResponse))
    }
  }
};

describe('[commercetools-composables] useProduct', () => {
  it('loads product variants', async () => {
    const { productsSearch } = useProduct('test-product') as any;

    const response = await productsSearch(context, { searchParams: { id: 'product-id' } });

    expect(response).toEqual({
      data: [product('prod1', 'prod-1', 'xxx1'), product('prod2', 'prod-2', 'xxx2')],
      total: 54
    });
    expect(context.$ct.api.getProduct).toBeCalledWith({ id: 'product-id' }, undefined);
    expect(enhanceProducts).toBeCalledWith(productResponse);
  });
});
