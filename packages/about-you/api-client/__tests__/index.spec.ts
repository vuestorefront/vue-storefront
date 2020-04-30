import { apiClientFactory } from '@vue-storefront/core';
import { BapiClient } from '@aboutyou/backbone';
import { setup, getCart, addItemToCart, deleteItemFromCart, updateItemInCart, bulkUpdateItemsInCart, getCategoryById, getCategoriesByIds, getCategoryByPath, getCategoryRoots, getFilters, getFiltersValues, getProductById, getProductsByIds, getProductsByQuery, getSearchMappings, getSearchSuggestions, getVariantsByIds, getWishlist, addItemToWishlist, deleteItemFromWishlist } from '../src/index';

jest.mock('@aboutyou/backbone', () => ({
  BapiClient: jest.fn()
}));

const BapiClientMock = {
  basket: {
    get: jest.fn(),
    addItem: jest.fn(),
    deleteItem: jest.fn(),
    updateItem: jest.fn(),
    addOrUpdateItems: jest.fn()
  },
  categories: {
    getById: jest.fn(),
    getByIds: jest.fn(),
    getByPath: jest.fn(),
    getRoots: jest.fn()
  },
  filters: {
    get: jest.fn(),
    getValues: jest.fn()
  },
  products: {
    getById: jest.fn(),
    getByIds: jest.fn(),
    query: jest.fn()
  },
  search: {
    suggestions: jest.fn(),
    mappings: jest.fn()
  },
  variants: {
    getByIds: jest.fn()
  },
  wishlist: {
    get: jest.fn(),
    addItem: jest.fn(),
    deleteItem: jest.fn()
  }
};
const defaultSettings = {
  api: {
    host: 'Test',
    auth: {
      username: 'John',
      password: 'Galt'
    },
    shopId: 1957
  }
};

describe('[about-you-api] index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('onSetup', () => {
    it('has been called after passing to apiClientFactory', async () => {
      const onSetup = jest.fn();

      const apiFactory = apiClientFactory({ defaultSettings, onSetup });
      apiFactory.setup({});

      expect(onSetup).toHaveBeenCalled();
    });
    describe('returns apiClient with methods', () => {
      beforeEach(() => {
        (BapiClient as any).mockImplementation(() => BapiClientMock);
        expect(setup(defaultSettings));
      }),

      it('getCart', () => {
        getCart('basketKey', {with: {}, campaignKey: 'px', checkoutShopId: 224});
        expect(BapiClientMock.basket.get).toHaveBeenCalled();
      });

      it('addItemToCart', () => {
        addItemToCart('basketKey', 1244, 1, {with: {}, customData: {}, displayData: {}, pricePromotionKey: '22x', campaignKey: 'px'});
        expect(BapiClientMock.basket.addItem).toHaveBeenCalled();
      });

      it('deleteItemFromCart', () => {
        deleteItemFromCart('basketKey', 'itemKey', {with: {}, campaignKey: 'px'});
        expect(BapiClientMock.basket.deleteItem).toHaveBeenCalled();
      });

      it('updateItemInCart', () => {
        updateItemInCart('basketKey', 'itemKey', 1, {with: {}, campaignKey: 'px'});
        expect(BapiClientMock.basket.updateItem).toHaveBeenCalled();
      });

      it('bulkUpdateItemsInCart', () => {
        bulkUpdateItemsInCart('basketKey', { variantId: 1244, quantity: 1, params: {childShopId: 2222, with: {}, customData: {}, displayData: {}, pricePromotionKey: '22x', campaignKey: 'px'} } as any);
        expect(BapiClientMock.basket.addOrUpdateItems).toHaveBeenCalled();
      });

      it('getCategoryById', () => {
        getCategoryById(2244, {with: {}, includeHidden: true});
        expect(BapiClientMock.categories.getById).toHaveBeenCalled();
      });

      it('getCategoriesByIds', () => {
        getCategoriesByIds([2244, 2245], {with: {}});
        expect(BapiClientMock.categories.getByIds).toHaveBeenCalled();
      });

      it('getCategoryByPath', () => {
        getCategoryByPath(['path1', 'path2'], {with: {}, includeHidden: true});
        expect(BapiClientMock.categories.getByPath).toHaveBeenCalled();
      });

      it('getCategoryRoots', () => {
        getCategoryRoots({with: {children: 1}, includeHidden: true});
        expect(BapiClientMock.categories.getRoots).toHaveBeenCalled();
      });

      it('getFilters', () => {
        getFilters({ where: {categoryId: 2244, term: '', minPrice: 0, maxPrice: 100, attributes: []}, campaignKey: 'x22x', with: ['values', 'category_ids']});
        expect(BapiClientMock.filters.get).toHaveBeenCalled();
      });

      it('getFiltersValues', () => {
        getFiltersValues('groupName', { where: {categoryId: 2244, term: '', minPrice: 0, maxPrice: 100, attributes: []}, campaignKey: 'px'});
        expect(BapiClientMock.filters.getValues).toHaveBeenCalled();
      });

      it('getProductById', () => {
        getProductById(2244, { with: {}, campaignKey: 'px', pricePromotionKey: '', includeSellableForFree: true});
        expect(BapiClientMock.products.getById).toHaveBeenCalled();
      });

      it('getProductsByIds', () => {
        getProductsByIds([2244, 2245], { with: {}, campaignKey: 'px', pricePromotionKey: '', includeSellableForFree: true});
        expect(BapiClientMock.products.getByIds).toHaveBeenCalled();
      });

      it('getProductsByQuery', () => {
        getProductsByQuery({where: {}, sort: {}, campaignKey: 'px', with: {}, pagination: {page: 0, perPage: 1}, includeSellableForFree: false, includeSoldOut: false, pricePromotionKey: '22x', minProductId: 1122});
        expect(BapiClientMock.products.query).toHaveBeenCalled();
      });

      it('getSearchSuggestions', () => {
        getSearchSuggestions('term', {campaignKey: 'px', with: {brands: 'all', categories: 'all', productNames: 'all', products: 'all'}});
        expect(BapiClientMock.search.suggestions).toHaveBeenCalled();
      });

      it('getSearchMappings', () => {
        getSearchMappings('term');
        expect(BapiClientMock.search.mappings).toHaveBeenCalled();
      });

      it('getVariantsByIds', () => {
        getVariantsByIds([1244, 1245], {with: {attributes: {} as any, advancedAttributes: {} as any, stock: 'all'}, campaignKey: 'px', pricePromotionKey: 'ppkey'});
        expect(BapiClientMock.variants.getByIds).toHaveBeenCalled();
      });

      it('getWishlist', () => {
        getWishlist('wishlistKey', {with: {items: {product: {}, variant: {}}}, campaignKey: 'px', pricePromotionKey: 'ppkey'});
        expect(BapiClientMock.wishlist.get).toHaveBeenCalled();
      });

      it('addItemToWishlist', () => {
        addItemToWishlist('wishlistKey', {masterKey: 'masterKey'}, {with: {}, campaignKey: 'px', childShopId: 6565, pricePromotionKey: 'ppkey' });
        expect(BapiClientMock.wishlist.addItem).toHaveBeenCalled();
      });

      it('deleteItemFromWishlist', () => {
        deleteItemFromWishlist('wishlistKey', 'itemKey', {with: {}, campaignKey: 'px', pricePromotionKey: 'ppkey'});
        expect(BapiClientMock.wishlist.deleteItem).toHaveBeenCalled();
      });

    });
  });
});
