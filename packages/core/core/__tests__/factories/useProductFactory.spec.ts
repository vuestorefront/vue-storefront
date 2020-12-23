import { useProductFactory } from '../../src/factories';
import { UseProduct } from '../../src/types';

const useProduct: (cacheId: string) => UseProduct<any, any> = useProductFactory<any, any>({
  productsSearch: (context, searchParams) => Promise.resolve([{ name: 'product ' + searchParams.slug }])
});

const factoryParams = {
  productsSearch: jest.fn()
};

const useProductMock = useProductFactory<any, any>(factoryParams);

describe('[CORE - factories] useProductFactory', () => {
  it('creates properties', () => {
    const { products, loading } = useProduct('test-product');

    expect(products.value).toEqual([]);
    expect(loading.value).toEqual(false);
  });

  it('returns product response', async () => {
    const { search, products } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([{name: 'product product-slug' }]);
  });

  it('returns product response with ssr', async () => {
    const { search, products } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([{name: 'product product-slug' }]);
  });

  it('should set error if factory method throwed', async () => {
    const err = new Error('zxczxcx');
    factoryParams.productsSearch.mockImplementationOnce(() => {
      throw err;
    });
    const { search, error } = useProductMock('a');

    await search({ someparam: 'qwerty' });

    expect(factoryParams.productsSearch).toHaveBeenCalledWith({ context: null }, { someparam: 'qwerty' });
    expect(error.value.search).toBe(err);
  });
});
