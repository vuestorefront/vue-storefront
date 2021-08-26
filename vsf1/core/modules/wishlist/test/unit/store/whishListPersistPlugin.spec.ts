import * as types from '@vue-storefront/core/modules/wishlist/store/mutation-types';
import whishListPersistPlugin from '@vue-storefront/core/modules/wishlist/store/whishListPersistPlugin';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));

describe('whishListPersistPlugin', () => {
  let mockSetItem;
  let mockState;

  beforeEach(() => {
    mockSetItem = jest.fn();

    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      setItem: mockSetItem
    }));

    mockState = {
      wishlist: {
        items: [
          { sku: 1 }, { sku: 2 }, { sku: 3 }
        ]
      }
    };

    jest.clearAllMocks();
  });

  it('should store wishlist in cache for supported mutations', () => {
    const mutations = [
      { type: `wishlist/${types.WISH_ADD_ITEM}` },
      { type: `wishlist/${types.WISH_DEL_ITEM}` },
      { type: `wishlist/${types.WISH_DEL_ALL_ITEMS}` }
    ];

    mutations.forEach(mutation => whishListPersistPlugin(mutation, mockState));

    expect(StorageManager.get).toHaveBeenCalledTimes(mutations.length);
    expect(StorageManager.get).toHaveBeenCalledWith('wishlist');
    expect(mockSetItem).toHaveBeenCalledTimes(mutations.length);
    expect(mockSetItem).toHaveBeenCalledWith('current-wishlist', mockState.wishlist.items);
  });

  it('should not store wishlist in cache for unsupported mutations', () => {
    const mutations = [
      { type: 'a/b/c' },
      { type: types.WISH_ADD_ITEM },
      { type: types.WISH_DEL_ITEM },
      { type: types.WISH_DEL_ALL_ITEMS },
      { type: `wishlist/${types.WISH_LOAD_WISH}` },
      { type: `wishlist/${types.SET_WISHLIST_LOADED}` }
    ];

    mutations.forEach(mutation => whishListPersistPlugin(mutation, mockState));

    expect(StorageManager.get).toHaveBeenCalledTimes(mutations.length);
    expect(StorageManager.get).toHaveBeenCalledWith('wishlist');
    expect(mockSetItem).not.toHaveBeenCalled();
  });
});
