import { useWishlistFactory } from '../../src/factories';

const factoryParams = {
  wishlist: {
    value: { key: '', items: [] }
  },
  loadWishlist: jest.fn(),
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
  clearWishlist: jest.fn()
};

const useWishlistMethods = useWishlistFactory(factoryParams)();

describe('[CORE - factories] useWishlistFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const { loading } = useWishlistMethods;

      expect(loading.value).toEqual(false);
    });
    it('returning computed wishlist', () => {
      const mockWishlistValues = { key: '1', items: [{}] };
      factoryParams.wishlist.value = mockWishlistValues;
      expect(useWishlistMethods.wishlist.value).toEqual(mockWishlistValues);
    });
  });
  describe('wishlist method', () => {
    it('addToWishlist has been called', async () => {
      factoryParams.addToWishlist.mockReturnValueOnce(null);
      await useWishlistMethods.addToWishlist({}, 1);
      expect(factoryParams.addToWishlist).toHaveBeenCalled();
      expect(useWishlistMethods.loading.value).toBe(false);
    });

    it('removeFromWishlist has been called', async () => {
      factoryParams.removeFromWishlist.mockReturnValueOnce(null);
      await useWishlistMethods.removeFromWishlist({});
      expect(factoryParams.removeFromWishlist).toHaveBeenCalled();
      expect(useWishlistMethods.loading.value).toBe(false);
    });

    it('clearWishlist has been called', async () => {
      factoryParams.clearWishlist.mockReturnValueOnce(null);
      await useWishlistMethods.clearWishlist();
      expect(factoryParams.clearWishlist).toHaveBeenCalled();
      expect(useWishlistMethods.loading.value).toBe(false);

    });

    it('loadWishlist has been called', async () => {
      factoryParams.loadWishlist.mockReturnValueOnce(null);
      await useWishlistMethods.refreshWishlist();
      expect(useWishlistMethods.loading.value).toBe(false);
      expect(factoryParams.loadWishlist).toHaveBeenCalled();
    });
  });
});
