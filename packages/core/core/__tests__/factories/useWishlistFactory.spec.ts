import { useWishlistFactory, UseWishlistFactoryParams } from '../../src/factories';
import { UseWishlist } from '../../src/types';
import { sharedRef } from './../../src/utils';

let useWishlist: () => UseWishlist<any, any, any>;
let setWishlist = null;
let params: UseWishlistFactoryParams<any, any, any>;

const customQuery = undefined;

function createComposable() {
  params = {
    loadWishlist: jest.fn().mockResolvedValueOnce({ id: 'mocked_wishlist' }),
    addToWishlist: jest.fn().mockResolvedValueOnce({ id: 'mocked_added_wishlist' }),
    isOnWishlist: jest.fn().mockReturnValueOnce(true),
    clearWishlist: jest.fn().mockResolvedValueOnce({ id: 'mocked_cleared_wishlist' }),
    removeFromWishlist: jest
      .fn()
      .mockResolvedValueOnce({ id: 'mocked_removed_wishlist' })
  };
  const factory = useWishlistFactory<any, any, any>(params);
  useWishlist = factory.useWishlist;
  setWishlist = factory.setWishlist;
}

describe('[CORE - factories] useWishlistFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createComposable();
  });

  describe('initial setup', () => {
    it('should have proper initial properties', async () => {
      const { wishlist, loading } = useWishlist();

      expect(wishlist.value).toEqual(null);
      expect(loading.value).toEqual(false);
    });

    it('should not load wishlist if is provided during factory creation', () => {
      createComposable();
      useWishlist();
      expect(params.loadWishlist).not.toBeCalled();
    });
    it('set given wishlist', () => {
      const { wishlist } = useWishlist();
      expect(wishlist.value).toEqual(null);
      setWishlist({ wishlist: 'test' });
      expect(sharedRef).toHaveBeenCalled();
    });
  });

  describe('computes', () => {
    describe('isOnWishlist', () => {
      it('should invoke implemented isOnWishlist method', () => {
        const { isOnWishlist } = useWishlist();
        const result = isOnWishlist({ id: 'productId' });
        expect(result).toEqual(true);
        expect(params.isOnWishlist).toBeCalledWith({ context: null }, {
          currentWishlist: null,
          product: { id: 'productId' }
        });
      });
    });
  });

  describe('methods', () => {
    describe('loadWishlist', () => {
      it('load the wishlist', async () => {
        createComposable();

        const { loadWishlist, wishlist } = useWishlist();
        await loadWishlist();
        expect(params.loadWishlist).toHaveBeenCalledWith({ context: null }, customQuery);
        expect(wishlist.value).toEqual({ id: 'mocked_wishlist' });
      });
    });

    describe('addToWishlist', () => {
      it('should invoke adding to wishlist', async () => {
        const { addToWishlist, wishlist } = useWishlist();
        await addToWishlist({ id: 'productId' });
        expect(params.addToWishlist).toHaveBeenCalledWith({ context: null }, {
          currentWishlist: null,
          product: { id: 'productId' }
        }, customQuery);
        expect(wishlist.value).toEqual({ id: 'mocked_added_wishlist' });
      });
    });

    describe('removeFromWishlist', () => {
      it('should invoke adding to wishlist', async () => {
        const { removeFromWishlist, wishlist } = useWishlist();
        await removeFromWishlist({ id: 'productId' });
        expect(params.removeFromWishlist).toHaveBeenCalledWith({ context: null }, {
          currentWishlist: null,
          product: { id: 'productId' }
        }, customQuery);
        expect(wishlist.value).toEqual({ id: 'mocked_removed_wishlist' });
      });
    });

    describe('clearWishlist', () => {
      it('should invoke clearWishlist', async () => {
        const { clearWishlist, wishlist } = useWishlist();
        await clearWishlist();
        expect(params.clearWishlist).toHaveBeenCalledWith({ context: null }, { currentWishlist: null });
        expect(wishlist.value).toEqual({ id: 'mocked_cleared_wishlist' });
      });
    });
  });
});
