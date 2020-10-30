import { getProductsByQuery, getProductById } from '@vue-storefront/about-you-api';
import { params } from '../../../src/composables/useProduct/factoryParams';

jest.mock('@vue-storefront/about-you-api', () => ({
  getProductsByQuery: jest.fn(),
  getProductById: jest.fn()
}));

jest.mock('@vue-storefront/core', () => ({
  useProductFactory: (params) => () => params
}));

describe('[about-you-cloud composables] useProduct factoryParams', () => {
  describe('productSearch', () => {
    it('returns product and available filters searched with default search params', async () => {
      (getProductsByQuery as jest.Mock).mockResolvedValueOnce({
        entities: [{ id: '331' }, { id: '332' }],
        pagination: { total: 1 }
      });
      expect(await params.productsSearch({}, null)).toEqual({
        data: [{ id: '331' }, { id: '332' }],
        total: 1
      });

      expect(getProductsByQuery).toBeCalledWith({pagination: {},
        sort: {},
        where: {},
        with: {
          advancedAttributes: 'all',
          attributes: 'all',
          categories: 'all',
          images: 'all',
          priceRange: true,
          siblings: 'all',
          variants: 'all'
        }
      });
    });

    it('returns product searched by id', async () => {
      (getProductById as jest.Mock).mockResolvedValueOnce({
        id: '331'
      });

      expect(await params.productsSearch({ id: '331' }, null)).toEqual({
        data: [{ id: '331' }],
        total: 1
      });
      expect(getProductById).toBeCalledWith('331', {
        with: {
          advancedAttributes: 'all',
          attributes: 'all',
          priceRange: true,
          variants: { advancedAttributes: 'all', attributes: 'all' }
        }
      });
    });
  });
});
