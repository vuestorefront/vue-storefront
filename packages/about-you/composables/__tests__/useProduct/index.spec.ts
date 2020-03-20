import { getProduct } from '@vue-storefront/about-you-api';
import useProduct from '../../src/composables/useProduct';
import { mapProductSearch } from '../../src/helpers';

jest.mock('@vue-storefront/about-you-api');
jest.mock('@vue-storefront/factories', () => ({
  useProductFactory: jest.fn(() => () => ({ foo: 'bar' }))
}));

describe('[about-you-composables] useProduct', () => {
  it('returns value of factory execution', () => {
    expect(useProduct('test')).toEqual({ foo: 'bar' });
  });

  it('mappes searchParams correctly in loadBapiProducts', async () => {
    const searchParams = {
      ids: [1, 2],
      term: '',
      sort: '',
      pagination: {
        page: 1
      }
    };

    const mockFn = jest.fn();
    (getProduct as jest.Mock).mockImplementation(mockFn);

    await mapProductSearch(searchParams);
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
});
