import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers';
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore';
import config from 'config';

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

describe('formatCategoryLink method', () => {
  let category: Category;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock('config', () => ({}));
    (currentStoreView as jest.Mock).mockImplementation(() => ({ storeCode: '' }));
    (localizedRoute as jest.Mock).mockImplementation(() => '');
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
      const result = formatCategoryLink(category, 'de');
      expect(localizedRoute).toBeCalledWith(category.url_path, 'de');
    });

    it('should return formatted homepage path when category is missing', () => {
      const result = formatCategoryLink(null, 'de');
      expect(localizedRoute).toBeCalledWith('/', 'de');
    });

    it('should use current storeCode if no storeCode is passed', () => {
      (currentStoreView as jest.Mock).mockImplementation(() => ({ storeCode: 'de' }));
      const result = formatCategoryLink(category);
      expect(localizedRoute).toBeCalledWith(category.url_path, 'de');
    });
  });

  describe('without urlDispatcher', () => {
    beforeEach(() => {
      config.seo = {
        useUrlDispatcher: false
      };
    });

    it('should return formatted category slug with prefix', () => {
      const result = formatCategoryLink(category, 'de');
      expect(localizedRoute).toBeCalledWith(`c/${category.slug}`, 'de');
    });

    it('should return formatted homepage path when category is missing', () => {
      const result = formatCategoryLink(null, 'de');
      expect(localizedRoute).toBeCalledWith('/', 'de');
    });

    it('should use current storeCode if no storeCode is passed', () => {
      (currentStoreView as jest.Mock).mockImplementation(() => ({ storeCode: 'de' }));
      const result = formatCategoryLink(category);
      expect(localizedRoute).toBeCalledWith(`c/${category.slug}`, 'de');
    });
  });
});
