import { parseCategoryPath } from '@vue-storefront/core/modules/breadcrumbs/helpers';
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

jest.mock('@vue-storefront/core/app', () => jest.fn());
jest.mock('@vue-storefront/core/lib/router-manager', () => jest.fn());
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(),
  localizedDispatcherRoute: jest.fn(),
  localizedRoute: jest.fn()
}));
jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))

describe('parseCategoryPath method', () => {
  describe('on category page', () => {
    let categories: Category[];

    beforeEach(() => {
      jest.clearAllMocks();
      (currentStoreView as jest.Mock).mockImplementation(() => ({ storeCode: '' }));
      categories = [
        {
          path: '1/2',
          is_active: true,
          level: 1,
          product_count: 1181,
          children_count: '38',
          parent_id: 1,
          name: 'All',
          id: 2,
          url_key: 'all-2',
          children_data: [],
          url_path: 'all-2',
          slug: 'all-2'
        },
        { path: '1/2/20',
          is_active: true,
          level: 2,
          product_count: 0,
          children_count: '8',
          parent_id: 2,
          name: 'Women',
          id: 20,
          url_path: 'women/women-20',
          url_key: 'women-20',
          children_data: [],
          slug: 'women-20'
        },
        {
          path: '1/2/20/21',
          is_active: true,
          level: 3,
          product_count: 0,
          children_count: '4',
          parent_id: 20,
          name: 'Tops',
          id: 21,
          url_path: 'women/tops-women/tops-21',
          url_key: 'tops-21',
          children_data: [],
          slug: 'tops-21'
        }
      ];
    });

    it('should return formatted category path for breadcrumbs', () => {
      const result = parseCategoryPath(categories);
      const expected = [
        {
          name: 'All',
          route_link: '/all-2'
        },
        {
          name: 'Women',
          route_link: '/women/women-20'
        },
        {
          name: 'Tops',
          route_link: '/women/tops-women/tops-21'
        }
      ];
      expect(result).toEqual(expected);
    });
  });

  describe('on product page', () => {
    let categories;

    beforeEach(() => {
      jest.clearAllMocks();
      (currentStoreView as jest.Mock).mockImplementation(() => ({ storeCode: '' }));
      categories = [
        {
          path: '1/2',
          is_active: true,
          level: 1,
          product_count: 1181,
          children_count: '38',
          parent_id: 1,
          name: 'All',
          id: 2,
          url_key: 'all-2',
          children_data: [],
          url_path: 'all-2',
          slug: 'all-2'
        },
        { path: '1/2/20',
          is_active: true,
          level: 2,
          product_count: 0,
          children_count: '8',
          parent_id: 2,
          name: 'Women',
          id: 20,
          url_path: 'women/women-20',
          url_key: 'women-20',
          children_data: [],
          slug: 'women-20'
        },
        {
          path: '1/2/20/21',
          is_active: true,
          level: 3,
          product_count: 0,
          children_count: '4',
          parent_id: 20,
          name: 'Tops',
          id: 21,
          url_path: 'women/tops-women/tops-21',
          url_key: 'tops-21',
          children_data: [],
          slug: 'tops-21'
        },
        {
          path: '1/2/20/21/23',
          is_active: true,
          level: 4,
          product_count: 186,
          children_count: '0',
          parent_id: 21,
          name: 'Jackets',
          id: 23,
          url_key: 'jackets-23',
          url_path: 'women/tops-women/jackets-women/jackets-23',
          slug: 'jackets-23'
        }
      ];
    });

    it('should return formatted category path for breadcrumbs', () => {
      const result = parseCategoryPath(categories);
      const expected = [
        {
          name: 'All',
          route_link: '/all-2'
        },
        {
          name: 'Women',
          route_link: '/women/women-20'
        },
        {
          name: 'Tops',
          route_link: '/women/tops-women/tops-21'
        },
        {
          name: 'Jackets',
          route_link: '/women/tops-women/jackets-women/jackets-23'
        }
      ];
      expect(result).toEqual(expected);
    });
  });
});
