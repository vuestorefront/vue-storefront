import { apiClientFactory } from '@vue-storefront/core';
import { BapiClient } from '@aboutyou/backbone';
import {
  setup,
  getCart,
  addItemToCart,
  deleteItemFromCart,
  updateItemInCart,
  bulkUpdateItemsInCart,
  getCategoryById,
  getCategoriesByIds,
  getCategoryByPath,
  getCategoryRoots,
  getFilters,
  getFiltersValues,
  getProductById,
  getProductsByIds,
  getProductsByQuery,
  getSearchMappings,
  getSearchSuggestions,
  getVariantsByIds,
  getWishlist,
  addItemToWishlist,
  deleteItemFromWishlist
} from '../src/index';

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
  },
<<<<<<< HEAD
  cartToken: '1234-1234-1234-abcd-12312412'
=======
  wishlistToken: 'db4a-2adc-7246-212c-1589494417559'
>>>>>>> fix tests for api client
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
      });

      it('getCart', () => {
        getCart('basketKey', {with: {}, campaignKey: 'px', checkoutShopId: 224});
        expect(BapiClientMock.basket.get).toHaveBeenLastCalledWith('basketKey', {campaignKey: 'px', checkoutShopId: 224, with: {}});

        getCart(null, {with: {}, campaignKey: 'px', checkoutShopId: 224});
        expect(BapiClientMock.basket.get).toHaveBeenLastCalledWith(defaultSettings.cartToken, {campaignKey: 'px', checkoutShopId: 224, with: {}});
      });

      it('addItemToCart', () => {
        addItemToCart('basketKey', 1244, 1, {with: {}, customData: {}, displayData: {}, pricePromotionKey: '22x', campaignKey: 'px'});
        expect(BapiClientMock.basket.addItem).toHaveBeenLastCalledWith('basketKey', 1244, 1, {campaignKey: 'px', customData: {}, displayData: {}, pricePromotionKey: '22x', with: {}});

        addItemToCart(null, 1244, 1, {with: {}, customData: {}, displayData: {}, pricePromotionKey: '22x', campaignKey: 'px'});
        expect(BapiClientMock.basket.addItem).toHaveBeenLastCalledWith(defaultSettings.cartToken, 1244, 1, {campaignKey: 'px', customData: {}, displayData: {}, pricePromotionKey: '22x', with: {}});
      });

      it('deleteItemFromCart', () => {
        deleteItemFromCart('basketKey', 'itemKey', {with: {}, campaignKey: 'px'});
        expect(BapiClientMock.basket.deleteItem).toHaveBeenLastCalledWith('basketKey', 'itemKey', {campaignKey: 'px', with: {}});

        deleteItemFromCart(null, 'itemKey', {with: {}, campaignKey: 'px'});
        expect(BapiClientMock.basket.deleteItem).toHaveBeenLastCalledWith(defaultSettings.cartToken, 'itemKey', {campaignKey: 'px', with: {}});
      });

      it('updateItemInCart', () => {
        updateItemInCart('basketKey', 'itemKey', 1, {with: {}, campaignKey: 'px'});
        expect(BapiClientMock.basket.updateItem).toHaveBeenLastCalledWith('basketKey', 'itemKey', 1, {campaignKey: 'px', with: {}});

        updateItemInCart(null, 'itemKey', 1, {with: {}, campaignKey: 'px'});
        expect(BapiClientMock.basket.updateItem).toHaveBeenLastCalledWith(defaultSettings.cartToken, 'itemKey', 1, {campaignKey: 'px', with: {}});
      });

      it('bulkUpdateItemsInCart', () => {
        bulkUpdateItemsInCart('basketKey', { variantId: 1244, quantity: 1, params: {childShopId: 2222, with: {}, customData: {}, displayData: {}, pricePromotionKey: '22x', campaignKey: 'px'} } as any);
        expect(BapiClientMock.basket.addOrUpdateItems).toHaveBeenLastCalledWith('basketKey', {params: {campaignKey: 'px', childShopId: 2222, customData: {}, displayData: {}, pricePromotionKey: '22x', with: {}}, quantity: 1, variantId: 1244});

        bulkUpdateItemsInCart(null, { variantId: 1244, quantity: 1, params: {childShopId: 2222, with: {}, customData: {}, displayData: {}, pricePromotionKey: '22x', campaignKey: 'px'} } as any);
        expect(BapiClientMock.basket.addOrUpdateItems).toHaveBeenLastCalledWith(defaultSettings.cartToken, {params: {campaignKey: 'px', childShopId: 2222, customData: {}, displayData: {}, pricePromotionKey: '22x', with: {}}, quantity: 1, variantId: 1244});
      });

      it('getCategoryById', () => {
        getCategoryById(2244, { with: {}, includeHidden: true });
        expect(BapiClientMock.categories.getById).toHaveBeenCalled();
      });

      it('getCategoriesByIds', () => {
        getCategoriesByIds([2244, 2245], { with: {} });
        expect(BapiClientMock.categories.getByIds).toHaveBeenCalled();
      });

      it('getCategoryByPath', () => {
        getCategoryByPath(['path1', 'path2'], {
          with: {},
          includeHidden: true
        });
        expect(BapiClientMock.categories.getByPath).toHaveBeenCalled();
      });

      it('getCategoryRoots', () => {
        getCategoryRoots({ with: { children: 1 }, includeHidden: true });
        expect(BapiClientMock.categories.getRoots).toHaveBeenCalled();
      });

      it('getFilters', () => {
        getFilters({
          where: {
            categoryId: 2244,
            term: '',
            minPrice: 0,
            maxPrice: 100,
            attributes: []
          },
          campaignKey: 'x22x',
          with: ['values', 'category_ids']
        });
        expect(BapiClientMock.filters.get).toHaveBeenCalled();
      });

      it('getFiltersValues', () => {
        getFiltersValues('groupName', {
          where: {
            categoryId: 2244,
            term: '',
            minPrice: 0,
            maxPrice: 100,
            attributes: []
          },
          campaignKey: 'px'
        });
        expect(BapiClientMock.filters.getValues).toHaveBeenCalled();
      });

      it('getProductById', () => {
        getProductById(2244, {
          with: {},
          campaignKey: 'px',
          pricePromotionKey: '',
          includeSellableForFree: true
        });
        expect(BapiClientMock.products.getById).toHaveBeenCalled();
      });

      it('getProductsByIds', () => {
        getProductsByIds([2244, 2245], {
          with: {},
          campaignKey: 'px',
          pricePromotionKey: '',
          includeSellableForFree: true
        });
        expect(BapiClientMock.products.getByIds).toHaveBeenCalled();
      });

      it('getProductsByQuery', () => {
        getProductsByQuery({
          where: {},
          sort: {},
          campaignKey: 'px',
          with: {},
          pagination: { page: 0, perPage: 1 },
          includeSellableForFree: false,
          includeSoldOut: false,
          pricePromotionKey: '22x',
          minProductId: 1122
        });
        expect(BapiClientMock.products.query).toHaveBeenCalled();
      });

      it('getSearchSuggestions', () => {
        getSearchSuggestions('term', {
          campaignKey: 'px',
          with: {
            brands: 'all',
            categories: 'all',
            productNames: 'all',
            products: 'all'
          }
        });
        expect(BapiClientMock.search.suggestions).toHaveBeenCalled();
      });

      it('getSearchMappings', () => {
        getSearchMappings('term');
        expect(BapiClientMock.search.mappings).toHaveBeenCalled();
      });

      it('getVariantsByIds', () => {
        getVariantsByIds([1244, 1245], {
          with: {
            attributes: {} as any,
            advancedAttributes: {} as any,
            stock: 'all'
          },
          campaignKey: 'px',
          pricePromotionKey: 'ppkey'
        });
        expect(BapiClientMock.variants.getByIds).toHaveBeenCalled();
      });

      it('getWishlist', () => {
        getWishlist('wishlistKey', {
          with: { items: { product: {}, variant: {} } },
          campaignKey: 'px',
          pricePromotionKey: 'ppkey'
        });
        expect(BapiClientMock.wishlist.get).toHaveBeenCalledWith(
          'wishlistKey',
          {
            campaignKey: 'px',
            pricePromotionKey: 'ppkey',
            with: { items: { product: {}, variant: {} } }
          }
        );
        getWishlist(null, {
          with: { items: { product: {}, variant: {} } },
          campaignKey: 'px',
          pricePromotionKey: 'ppkey'
        });
        expect(BapiClientMock.wishlist.get).toHaveBeenCalledWith(
          defaultSettings.wishlistToken,
          {
            campaignKey: 'px',
            pricePromotionKey: 'ppkey',
            with: { items: { product: {}, variant: {} } }
          }
        );
      });

      it('addItemToWishlist', () => {
        addItemToWishlist(
          'wishlistKey',
          { masterKey: 'masterKey' },
          {
            with: {},
            campaignKey: 'px',
            childShopId: 6565,
            pricePromotionKey: 'ppkey'
          }
        );
        expect(BapiClientMock.wishlist.addItem).toHaveBeenCalledWith(
          'wishlistKey',
          { masterKey: 'masterKey' },
          {
            campaignKey: 'px',
            childShopId: 6565,
            pricePromotionKey: 'ppkey',
            with: {}
          }
        );
        addItemToWishlist(
          null,
          { masterKey: 'masterKey' },
          {
            with: {},
            campaignKey: 'px',
            childShopId: 6565,
            pricePromotionKey: 'ppkey'
          }
        );
        expect(BapiClientMock.wishlist.addItem).toHaveBeenCalledWith(
          defaultSettings.wishlistToken,
          { masterKey: 'masterKey' },
          {
            campaignKey: 'px',
            childShopId: 6565,
            pricePromotionKey: 'ppkey',
            with: {}
          }
        );
      });

      it('deleteItemFromWishlist', () => {
        deleteItemFromWishlist('wishlistKey', 'itemKey', {
          with: {},
          campaignKey: 'px',
          pricePromotionKey: 'ppkey'
        });
        expect(BapiClientMock.wishlist.deleteItem).toHaveBeenCalledWith(
          'wishlistKey',
          'itemKey',
          {
            campaignKey: 'px',
            pricePromotionKey: 'ppkey',
            with: {}
          }
        );
        deleteItemFromWishlist(null, 'itemKey', {
          with: {},
          campaignKey: 'px',
          pricePromotionKey: 'ppkey'
        });
        expect(BapiClientMock.wishlist.deleteItem).toHaveBeenCalledWith(
          defaultSettings.wishlistToken,
          'itemKey',
          {
            campaignKey: 'px',
            pricePromotionKey: 'ppkey',
            with: {}
          }
        );
      });
    });
  });
});
