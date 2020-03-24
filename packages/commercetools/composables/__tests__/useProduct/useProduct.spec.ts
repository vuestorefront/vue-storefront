import useProduct from '../../src/useProduct';
import enhanceProducts from './../../src/helpers/internals/enhanceProduct';
import { getProduct } from '@vue-storefront/commercetools-api';

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

jest.mock('@vue-storefront/commercetools-api', () => ({
  getProduct: jest.fn(() => Promise.resolve(productResponse))
}));

jest.mock('./../../src/helpers/internals/enhanceProduct', () => jest.fn((args) => args));

describe('[commercetools-composables] useProduct', () => {
  it('loads product variants', async () => {
    const { productsSearch } = useProduct('test-product') as any;

    const response = await productsSearch({ id: 'product-id' });

    expect(response).toEqual({
      data: [product('prod1', 'prod-1', 'xxx1'), product('prod2', 'prod-2', 'xxx2')],
      total: 54
    });
    expect(getProduct).toBeCalledWith({ id: 'product-id' });
    expect(enhanceProducts).toBeCalledWith(productResponse);
  });
});
