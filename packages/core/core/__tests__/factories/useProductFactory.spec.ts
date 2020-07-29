import { useProductFactory } from '../../src/factories';
import { UseProduct } from '../../src/types';

jest.mock('../../src/utils');

const useProduct: (cacheId: string) => UseProduct<any, any, any> = useProductFactory<any, any, any, any>({
  productsSearch: searchParams => Promise.resolve({
    data: [{ name: 'product ' + searchParams.slug }],
    total: 1,
    availableFilters: null,
    availableSortingOptions: [
      {value: 'price-up', label: 'Price from low to hight'},
      {value: 'price-down', label: 'Price from hight to low'}
    ]
  })
});

describe('[CORE - factories] useProductFactory', () => {
  it('creates properties', () => {
    const { products, loading, totalProducts, availableFilters } = useProduct('test-product');

    expect(products.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(totalProducts.value).toEqual(0);
    expect(availableFilters.value).toEqual(null);
  });

  it('returns product response', async () => {
    const { search, products, totalProducts } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([{name: 'product product-slug' }]);
    expect(totalProducts.value).toEqual(1);
  });

  it('returns product response with ssr', async () => {
    const { search, products, totalProducts } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([{name: 'product product-slug' }]);
    expect(totalProducts.value).toEqual(1);
  });

  it('returns computed product sorting options from params', async () => {
    const { availableSortingOptions, search } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(availableSortingOptions.value).toEqual([
      {value: 'price-up', label: 'Price from low to hight'},
      {value: 'price-down', label: 'Price from hight to low'}
    ]);
  });
});
