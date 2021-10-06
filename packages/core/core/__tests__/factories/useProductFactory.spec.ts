import { useProductFactory } from '../../src/factories';
import { UseProduct } from '../../src/types';
import { isCacheValid } from '../../src/utils';

const useProduct: (cacheId: string) => UseProduct<any, any> = useProductFactory<any, any>({
  productsSearch: (searchParams) => Promise.resolve([{ name: 'product ' + searchParams.slug }])
});

const factoryParams = {
  productsSearch: jest.fn()
};

const useProductMock = useProductFactory<any, any>(factoryParams);

describe('[CORE - factories] useProductFactory', () => {
  beforeEach(() => {
    (isCacheValid as jest.Mock).mockReturnValue(false);
  });

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

  it('does not invoke content search when isCacheValid returns true', async () => {
    (isCacheValid as jest.Mock).mockReturnValue(true);
    const { search, products } = useProduct('test-use-product');
    await search({ slug: 'product-slug' });
    expect(products.value).toEqual([]);

  });

  it('invokes content search when isCacheValid returns true and force param is true', async () => {
    (isCacheValid as jest.Mock).mockReturnValue(true);
    const { search, products } = useProduct('test-use-product');
    const searchParams = { slug: 'product-slug', force: true };
    await search(searchParams);
    expect(products.value).toEqual([{name: 'product product-slug' }]);
  });

  it('should set error if factory method throwed', async () => {
    const err = new Error('zxczxcx');
    factoryParams.productsSearch.mockImplementationOnce(() => {
      throw err;
    });
    const { search, error } = useProductMock('a');

    await search({ someparam: 'qwerty' });

    expect(error.value.search).toBe(err);
  });
});
