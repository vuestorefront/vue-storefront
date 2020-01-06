import * as types from '@vue-storefront/core/modules/wishlist/store/mutation-types';
import wishlistActions from '@vue-storefront/core/modules/wishlist/store/actions';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));

describe('Wishlist actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('clear', () => {
    it('should delete all items', () => {
      const mockContext = {
        commit: jest.fn()
      };

      (wishlistActions as any).clear(mockContext);

      expect(mockContext.commit).toHaveBeenCalledWith(types.WISH_DEL_ALL_ITEMS, []);
    });
  });

  describe('load', () => {
    let wishlist;

    beforeEach(() => {
      wishlist = [{ sku: 1 }, { sku: 2 }, { sku: 3 }];
    });

    it('should not load wishlist if it is already loaded', () => {
      const mockContext = {
        commit: jest.fn(),
        dispatch: jest.fn(),
        getters: {
          isWishlistLoaded: true
        }
      };

      (wishlistActions as any).load(mockContext);

      expect(mockContext.commit).not.toHaveBeenCalled();
      expect(mockContext.dispatch).not.toHaveBeenCalled();
    });

    it('should load wishlist if it is not loaded', async () => {
      const mockContext = {
        commit: jest.fn(),
        dispatch: jest.fn(() => {
          return new Promise(resolve => resolve(wishlist));
        }),
        getters: {
          isWishlistLoaded: false
        }
      };

      await (wishlistActions as any).load(mockContext);

      expect(mockContext.commit).toHaveBeenCalledTimes(2);
      expect(mockContext.commit).toHaveBeenNthCalledWith(1, types.SET_WISHLIST_LOADED);
      expect(mockContext.commit).toHaveBeenNthCalledWith(2, types.WISH_LOAD_WISH, wishlist);
      expect(mockContext.dispatch).toHaveBeenCalledWith('loadFromCache');
    });

    it('should load wishlist with "force" argument even if it is already loaded', async () => {
      const mockContext = {
        commit: jest.fn(),
        dispatch: jest.fn(() => {
          return new Promise(resolve => resolve(wishlist));
        }),
        getters: {
          isWishlistLoaded: true
        }
      };

      await (wishlistActions as any).load(mockContext, true);

      expect(mockContext.commit).toHaveBeenCalledTimes(2);
      expect(mockContext.commit).toHaveBeenNthCalledWith(1, types.SET_WISHLIST_LOADED);
      expect(mockContext.commit).toHaveBeenNthCalledWith(2, types.WISH_LOAD_WISH, wishlist);
      expect(mockContext.dispatch).toHaveBeenCalledWith('loadFromCache');
    });
  });

  describe('loadFromCache', () => {
    it('should load wishlist from cache', () => {
      const mockGetItem = jest.fn(() => ({}));

      (StorageManager.get as jest.Mock).mockImplementation(() => ({
        getItem: mockGetItem
      }));

      const wishlistStorage = (wishlistActions as any).loadFromCache();

      expect(StorageManager.get).toHaveBeenCalledWith('wishlist');
      expect(mockGetItem).toHaveBeenCalledWith('current-wishlist');
      expect(wishlistStorage).toEqual({});
    });
  });

  describe('addItem', () => {
    it('should add product to wishlist', () => {
      const product = { sku: 1 };
      const mockContext = {
        commit: jest.fn()
      };

      (wishlistActions as any).addItem(mockContext, product);

      expect(mockContext.commit).toHaveBeenCalledWith(types.WISH_ADD_ITEM, { product });
    });
  });

  describe('removeItem', () => {
    it('should remove product from wishlist', () => {
      const product = { sku: 1 };
      const mockContext = {
        commit: jest.fn()
      };

      (wishlistActions as any).removeItem(mockContext, product);

      expect(mockContext.commit).toHaveBeenCalledWith(types.WISH_DEL_ITEM, { product });
    });
  });
});
