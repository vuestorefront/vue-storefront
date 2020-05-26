import { useProductFactory } from '../../src/factories';
import { UseProduct } from '../../src/types';
import * as vsfUtils from '../../src/utils';

jest.mock('../../src/utils');
const mockedUtils = vsfUtils as jest.Mocked<typeof vsfUtils>;

const useProduct: (cacheId: string) => UseProduct<any, any, any> = useProductFactory<any, any, any, any>({
  productsSearch: searchParams => Promise.resolve({
    data: [{ name: 'product ' + searchParams.slug }],
    total: 1,
    availableFilters: null,
    availableSortingOptions: null
  })
});

describe('[CORE - factories] useProductFactory', () => {
  it('creates properties', () => {
    mockedUtils.useSSR.mockReturnValueOnce({
      initialState: null,
      saveToInitialState: jest.fn()
    });

    const { products, loading, totalProducts, availableFilters } = useProduct('test-product');

    expect(products.value).toEqual([]);
    expect(loading.value).toEqual(false);
    expect(totalProducts.value).toEqual(0);
    expect(availableFilters.value).toEqual(null);
  });

  it('creates properties with ssr', () => {
    mockedUtils.useSSR.mockReturnValueOnce({
      initialState: { data: [{ prod: 1 }], total: 5, availableFilters: { filter: 'filter' } },
      saveToInitialState: jest.fn()
    });

    const { products, loading, totalProducts, availableFilters } = useProduct('test-product');

    expect(products.value).toEqual([{ prod: 1 }]);
    expect(loading.value).toEqual(false);
    expect(totalProducts.value).toEqual(5);
    expect(availableFilters.value).toEqual({ filter: 'filter' });
  });

  it('returns product response', async () => {
    const saveToInitialState = jest.fn();
    mockedUtils.useSSR.mockReturnValueOnce({
      initialState: null,
      saveToInitialState
    });

    const { search, products, totalProducts } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([{name: 'product product-slug' }]);
    expect(totalProducts.value).toEqual(1);
    expect(saveToInitialState).toBeCalledWith({
      data: [{name: 'product product-slug' }],
      total: 1,
      availableFilters: null,
      availableSortingOptions: null
    });
  });

  it('returns product response with ssr', async () => {
    const saveToInitialState = jest.fn();
    mockedUtils.useSSR.mockReturnValueOnce({
      initialState: { data: [{ prod: 1 }], total: 5 },
      saveToInitialState
    });

    const { search, products, totalProducts } = useProduct('test-use-product');

    await search({ slug: 'product-slug' });

    expect(products.value).toEqual([{name: 'product product-slug' }]);
    expect(totalProducts.value).toEqual(1);
    expect(saveToInitialState).toBeCalledWith({
      data: [{name: 'product product-slug' }],
      total: 1,
      availableFilters: null,
      availableSortingOptions: null
    });
  });

  it('returns computed product sorting options from params', () => {
    const saveToInitialState = jest.fn();
    mockedUtils.useSSR.mockReturnValueOnce({
      initialState: { data: [{ prod: 1 }],
        total: 5,
        availableFilters: null,
        availableSortingOptions: [
          {value: 'price-up', label: 'Price from low to hight'}, {value: 'price-down', label: 'Price from hight to low'}
        ]
      },
      saveToInitialState
    });
    const { availableSortingOptions } = useProduct('test-use-product');
    expect(availableSortingOptions.value).toEqual([
      {value: 'price-up', label: 'Price from low to hight'},
      {value: 'price-down', label: 'Price from hight to low'}
    ]);
  });
});
