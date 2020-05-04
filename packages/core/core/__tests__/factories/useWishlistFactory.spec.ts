import { useWishlistFactory } from '../../src/factories';
import * as vsfUtils from '../../src/utils';

jest.mock('../../src/utils');

const mockedUtils = vsfUtils as jest.Mocked<typeof vsfUtils>;
mockedUtils.onSSR.mockImplementation((fn) => fn());
mockedUtils.useSSR.mockReturnValueOnce({
  initialState: null,
  saveToInitialState: jest.fn()
});

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
  describe('methods', () => {

    describe('addToWishlist', () => {
      it('calls addToWishlist factory parameter method', async () => {
        factoryParams.addToWishlist.mockReturnValueOnce(null);
        await useWishlistMethods.addToWishlist({}, 1);
        expect(factoryParams.addToWishlist).toHaveBeenCalled();
      });

      it('finally loading go to false', () => {
        expect(useWishlistMethods.loading.value).toBe(false);
      });
    });

    describe('removeFromWishlist', () => {
      it('calls removeFromWishlist factory parameter method', async () => {
        factoryParams.removeFromWishlist.mockReturnValueOnce(null);
        await useWishlistMethods.removeFromWishlist({});
        expect(factoryParams.removeFromWishlist).toHaveBeenCalled();
      });

      it('finally loading go to false', () => {
        expect(useWishlistMethods.loading.value).toBe(false);
      });
    });

    describe('clearWishlist', () => {
      it('calls clearWishlist factory parameter method', async () => {
        factoryParams.clearWishlist.mockReturnValueOnce(null);
        await useWishlistMethods.clearWishlist();
        expect(factoryParams.clearWishlist).toHaveBeenCalled();
      });

      it('finally loading go to false', () => {
        expect(useWishlistMethods.loading.value).toBe(false);
      });
    });

    describe('refreshWishlist', () => {
      it('calls loadWishlist factory parameter method', async () => {
        factoryParams.loadWishlist.mockReturnValueOnce(null);
        await useWishlistMethods.refreshWishlist();
        expect(factoryParams.loadWishlist).toHaveBeenCalled();
      });

      it('finally loading go to false', () => {
        expect(useWishlistMethods.loading.value).toBe(false);
      });
    });
  });
});
