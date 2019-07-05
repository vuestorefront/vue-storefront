import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers';
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';
import config from 'config';

jest.mock('@vue-storefront/core/app', () => jest.fn());
jest.mock('@vue-storefront/core/lib/router-manager', () => jest.fn());
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: () => ({ storeCode: '' }),
  localizedDispatcherRoute: jest.fn(),
  localizedRoute: jest.fn()
}));

describe('formatCategoryLink method', () => {
  let category: Category;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('config', () => ({}));
    category = {
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
      url_path: 'all-2/women/women-20',
      slug: 'all-2'
    };
  });

  describe('with active urlDispatcher', () => {
    beforeEach(() => {
      config.seo = {
        useUrlDispatcher: true
      };
    });

    it('should return formatted category url_path', () => {
      const result = formatCategoryLink(category);
      expect(result).toEqual('/all-2/women/women-20');
    });

    it('should return formatted category url_path when storeCode passed as null', () => {
      const result = formatCategoryLink(category, null);
      expect(result).toEqual('/all-2/women/women-20');
    });

    it('should return formatted category url_path when storeCode passed as \'de\'', () => {
      const result = formatCategoryLink(category, 'de');
      expect(result).toEqual('/de/all-2/women/women-20');
    });

    it('should return formatted category url_path when storeCode passed as \'\'', () => {
      const result = formatCategoryLink(category, '');
      expect(result).toEqual('/all-2/women/women-20');
    });

    xit('should throw error when category passed as \'null\'', () => {
      formatCategoryLink(null);
      expect(formatCategoryLink).toThrowError();
    });

    // TODO
    xdescribe('with default storeCode set to \'de\'', () => {
      beforeEach(() => {
      });

      xit('should return formatted category url_path statring with \'de\'', () => {
        const result = formatCategoryLink(category);
        expect(result).toEqual('/de/all-2/women/women-20');
      });
    })
  });

  describe('without urlDispatcher', () => {
    beforeEach(() => {
      config.seo = {
        useUrlDispatcher: false
      };
    });

    it('should return old path with c and category slug', () => {
      const result = formatCategoryLink(category);
      expect(result).toEqual('/c/all-2');
    });

    it('should return old path with c and category slug when storeCode passed as null', () => {
      const result = formatCategoryLink(category, null);
      expect(result).toEqual('/c/all-2');
    });

    it('should return old path with c and category slug when storeCode passed as \'de\'', () => {
      const result = formatCategoryLink(category, 'de');
      expect(result).toEqual('/de/c/all-2');
    });

    it('should return old path with c and category slug when storeCode passed as \'\'', () => {
      const result = formatCategoryLink(category, '');
      expect(result).toEqual('/c/all-2');
    });
  });
});
