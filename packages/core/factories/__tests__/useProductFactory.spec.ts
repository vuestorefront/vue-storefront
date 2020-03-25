import { useProductFactory } from '../src';
import { UseProduct } from '@vue-storefront/interfaces';
import * as vsfUtils from '@vue-storefront/utils';

jest.mock('@vue-storefront/utils');
const mockedUtils = vsfUtils as jest.Mocked<typeof vsfUtils>;

const useProduct: (cacheId: string) => UseProduct<any> = useProductFactory<
  any,
  any
>({
  productsSearch: searchParams => {
    return Promise.resolve({ data: [{ name: 'product' + searchParams }], total: 1 });
  }
});

describe('[CORE - factories] useProductFactory', () => {
  it('creates properties', () => {
    mockedUtils.useSSR.mockReturnValueOnce({
      initialState: null,
      saveToInitialState: jest.fn()
    });

    const { products, loading, totalProducts } = useProduct('test-product');

    expect(products.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(totalProducts.value).toEqual(0);
  });

  it('returns product response', async () => {
    mockedUtils.useSSR.mockReturnValueOnce({
      initialState: null,
      saveToInitialState: jest.fn()
    });

    const { search, products, totalProducts } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([{name: 'product' + { slug: 'product-slug' }}]);
    expect(totalProducts.value).toEqual(1);
  });
});
