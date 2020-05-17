import { useWishlistFactory, UseWishlistFactoryParams } from '../../src/factories';
import { UseWishlist } from '../../src/types';
import * as vsfUtils from '../../src/utils';

jest.mock('../../src/utils');
const mockedUtils = vsfUtils as jest.Mocked<typeof vsfUtils>;
mockedUtils.onSSR.mockImplementation((fn) => fn());

let useWishlist: () => UseWishlist<any, any, any>;
let setWishlist = null;
let params: UseWishlistFactoryParams<any, any, any>;

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
      mockedUtils.useSSR.mockReturnValueOnce({ initialState: 'some-wishlist1', saveToInitialState: jest.fn() });
      const { wishlist: wishlist1, loading } = useWishlist();

      expect(wishlist1.value).toEqual('some-wishlist1');
      expect(loading.value).toEqual(false);

      mockedUtils.useSSR.mockReturnValueOnce({ initialState: 'some-wishlist2', saveToInitialState: jest.fn() });
      const { wishlist: wishlist2 } = useWishlist();
      expect(wishlist2.value).toEqual('some-wishlist1');
    });

    it('should not load wishlist if is provided during factory creation', () => {
      mockedUtils.useSSR.mockReturnValueOnce({
        initialState: { id: 'existingWishlist' },
        saveToInitialState: jest.fn()
      });
      createComposable();
      useWishlist();
      expect(params.loadWishlist).not.toBeCalled();
    });
    it('set given wishlist', () => {
      mockedUtils.useSSR.mockReturnValueOnce({
        initialState: null,
        saveToInitialState: jest.fn()
      });
      const { wishlist } = useWishlist();
      expect(wishlist.value).toEqual(null);
      setWishlist({ wishlist: 'test' });
      expect(wishlist.value).toEqual({ wishlist: 'test' });
    });
  });

  describe('computes', () => {
    describe('isOnWishlist', () => {
      it('should invoke implemented isOnWishlist method', () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        const { isOnWishlist } = useWishlist();
        const result = isOnWishlist({ id: 'productId' });
        expect(result).toEqual(true);
        expect(params.isOnWishlist).toBeCalledWith({
          currentWishlist: null,
          product: { id: 'productId' }
        });
      });
    });
  });

  describe('methods', () => {
    describe('loadWishlist', () => {
      it('load the wishlist', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        createComposable();

        const { loadWishlist, wishlist } = useWishlist();
        await loadWishlist();
        await loadWishlist();
        expect(params.loadWishlist).toHaveBeenCalled();
        expect(wishlist.value).toEqual({ id: 'mocked_wishlist' });
      });
    });

    describe('addToWishlist', () => {
      it('should invoke adding to wishlist', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        const { addToWishlist, wishlist } = useWishlist();
        await addToWishlist({ id: 'productId' });
        expect(params.addToWishlist).toHaveBeenCalledWith({
          currentWishlist: null,
          product: { id: 'productId' }
        });
        expect(wishlist.value).toEqual({ id: 'mocked_added_wishlist' });
      });
    });

    describe('removeFromWishlist', () => {
      it('should invoke adding to wishlist', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        const { removeFromWishlist, wishlist } = useWishlist();
        await removeFromWishlist({ id: 'productId' });
        expect(params.removeFromWishlist).toHaveBeenCalledWith({
          currentWishlist: null,
          product: { id: 'productId' }
        });
        expect(wishlist.value).toEqual({ id: 'mocked_removed_wishlist' });
      });
    });

    describe('clearWishlist', () => {
      it('should invoke clearWishlist', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        const { clearWishlist, wishlist } = useWishlist();
        await clearWishlist();
        expect(params.clearWishlist).toHaveBeenCalledWith({ currentWishlist: null });
        expect(wishlist.value).toEqual({ id: 'mocked_cleared_wishlist' });
      });
    });
  });
});
