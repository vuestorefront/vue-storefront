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
        getCart('basketKey');
        expect(BapiClientMock.basket.get).toHaveBeenCalled();
      });

      it('addItemToCart', () => {
        addItemToCart('basketKey', 0);
        expect(BapiClientMock.basket.addItem).toHaveBeenCalled();
      });

      it('deleteItemFromCart', () => {
        deleteItemFromCart('basketKey', 'itemKey');
        expect(BapiClientMock.basket.deleteItem).toHaveBeenCalled();
      });

      it('updateItemInCart', () => {
        updateItemInCart('basketKey', 'itemKey', 0);
        expect(BapiClientMock.basket.updateItem).toHaveBeenCalled();
      });

      it('bulkUpdateItemsInCart', () => {
        bulkUpdateItemsInCart('basketKey', { variantId: 0, quantity: 0, params: 'with' } as any);
        expect(BapiClientMock.basket.addOrUpdateItems).toHaveBeenCalled();
      });

      it('getCategoryById', () => {
        getCategoryById(0);
        expect(BapiClientMock.categories.getById).toHaveBeenCalled();
      });

      it('getCategoriesByIds', () => {
        getCategoriesByIds([]);
        expect(BapiClientMock.categories.getByIds).toHaveBeenCalled();
      });

      it('getCategoryByPath', () => {
        getCategoryByPath([]);
        expect(BapiClientMock.categories.getByPath).toHaveBeenCalled();
      });

      it('getCategoryRoots', () => {
        getCategoryRoots();
        expect(BapiClientMock.categories.getRoots).toHaveBeenCalled();
      });

      it('getFilters', () => {
        getFilters('' as any);
        expect(BapiClientMock.filters.get).toHaveBeenCalled();
      });

      it('getFiltersValues', () => {
        getFiltersValues('', '' as any);
        expect(BapiClientMock.filters.getValues).toHaveBeenCalled();
      });

      it('getProductById', () => {
        getProductById(0);
        expect(BapiClientMock.products.getById).toHaveBeenCalled();
      });

      it('getProductsByIds', () => {
        getProductsByIds([]);
        expect(BapiClientMock.products.getByIds).toHaveBeenCalled();
      });

      it('getProductsByQuery', () => {
        getProductsByQuery();
        expect(BapiClientMock.products.query).toHaveBeenCalled();
      });

      it('getSearchSuggestions', () => {
        getSearchSuggestions('');
        expect(BapiClientMock.search.suggestions).toHaveBeenCalled();
      });

      it('getSearchMappings', () => {
        getSearchMappings('');
        expect(BapiClientMock.search.mappings).toHaveBeenCalled();
      });

      it('getVariantsByIds', () => {
        getVariantsByIds([]);
        expect(BapiClientMock.variants.getByIds).toHaveBeenCalled();
      });

      it('getWishlist', () => {
        getWishlist('');
        expect(BapiClientMock.wishlist.get).toHaveBeenCalled();
      });

      it('addItemToWishlist', () => {
        addItemToWishlist('', '' as any);
        expect(BapiClientMock.wishlist.addItem).toHaveBeenCalled();
      });

      it('deleteItemFromWishlist', () => {
        deleteItemFromWishlist('', '');
        expect(BapiClientMock.wishlist.deleteItem).toHaveBeenCalled();
      });

    });
  });
});
