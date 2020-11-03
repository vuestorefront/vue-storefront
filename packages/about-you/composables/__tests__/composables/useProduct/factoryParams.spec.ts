import { getProductsByQuery, getProductById, getFilters } from '@vue-storefront/about-you-api';
import { params } from '../../../src/composables/useProduct/factoryParams';

jest.mock('@vue-storefront/about-you-api', () => ({
  getFilters: jest.fn(),
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

      expect(await params.productsSearch({}, null)).toEqual({
        data: [{ id: '331' }, { id: '332' }],
        total: 1,
        availableSortingOptions: [
          { value: 'price-asc', label: 'Price from low to high' },
          { value: 'price-desc', label: 'Price from high to low' },
          { value: 'new-asc', label: 'Latest' },
          { value: 'reduction-desc', label: 'Discount from high to low' },
          { value: 'reduction-asc', label: 'Discount from low to hight' },
          { value: 'new-desc', label: 'Oldest' }
        ],
        availableFilters: {
          country: {
            id: 1525,
            name: 'Country',
            options: [
              {
                id: 73349,
                name: 'Germany',
                productCount: 1,
                selected: false
              }
            ],
            slug: 'country',
            type: 'attributes'
          },
          prices: {
            id: null,
            name: 'Prices',
            options: [
              {
                max: 10900,
                min: 5000,
                productCount: 4,
                selected: false
              }
            ],
            slug: 'prices',
            type: 'range'
          }
        }
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
        total: 1,
        availableSortingOptions: [
          { value: 'price-asc', label: 'Price from low to high' },
          { value: 'price-desc', label: 'Price from high to low' },
          { value: 'new-asc', label: 'Latest' },
          { value: 'reduction-desc', label: 'Discount from high to low' },
          { value: 'reduction-asc', label: 'Discount from low to hight' },
          { value: 'new-desc', label: 'Oldest' }
        ]
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
