import { getProductsByQuery, getFilters } from '@vue-storefront/about-you-api';
import useProduct from '../../../src/composables/useProduct';
import { mapProductSearchByQueryParams } from '../../../src/helpers';
import { factoryParams } from '../../../src/composables/useProduct/factoryParams';

jest.mock('@vue-storefront/about-you-api', () => ({
  getFilters: jest.fn(),
  getProductByQuery: jest.fn()
}));
jest.mock('@vue-storefront/core', () => ({
  useProductFactory: jest.fn(() => () => ({ foo: 'bar' }))
}));

describe('[about-you-composables] useProduct', () => {
  it.skip('returns value of factory execution', () => {
    expect(useProduct('test')).toEqual({ foo: 'bar' });
  });

  it.skip('mappes searchParams correctly in loadBapiProducts', async () => {
    const searchParams = {
      ids: [1, 2],
      term: '',
      sort: '',
      pagination: {
        page: 1
      }
    };

    const mockFn = jest.fn(() => []);
    (getProductsByQuery as jest.Mock).mockImplementation(mockFn);

    await mapProductSearchByQueryParams(searchParams);
    expect(mockFn).toHaveBeenLastCalledWith({
      ids: searchParams.ids,
      with: searchParams.term,
      where: searchParams.term,
      sort: searchParams.sort,
      page: searchParams.pagination.page,
      masterKey: '',
      term: searchParams.term
    });
  });

  it('map available filters  ', async () => {
    (getFilters as jest.Mock).mockReturnValueOnce([
      {
        id: null,
        slug: 'prices',
        name: 'Prices',
        type: 'range',
        values: [
          {
            min: 5000,
            max: 10900,
            productCount: 4
          }
        ]
      },
      {
        id: 1525,
        slug: 'country',
        name: 'Country',
        type: 'attributes',
        values: [
          {
            name: 'Germany',
            productCount: 1,
            id: 73349
          }
        ]
      }
    ]);
    const mappedFilters = await factoryParams.availableFilters({categoryId: 1111});

    expect(getFilters).toHaveBeenCalled();
    expect(mappedFilters).toEqual({
      prices: {
        id: null,
        name: 'Prices',
        options: [{max: 10900, min: 5000, productCount: 4, selected: false}],
        slug: 'prices',
        type: 'range'
      },
      country: {
        id: 1525,
        name: 'Country',
        options: [{
          id: 73349,
          name: 'Germany',
          productCount: 1,
          selected: false
        }],
        slug: 'country',
        type: 'attributes'
      }
    });
  });
});
