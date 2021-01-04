import { useProductFactory } from '../../src/factories';
import { UseProduct } from '../../src/types';

const useProduct: (cacheId: string) => UseProduct<any, any> = useProductFactory<any, any>({
  productsSearch: (context, searchParams) => Promise.resolve([{ name: 'product ' + searchParams.slug }])
});

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
});
