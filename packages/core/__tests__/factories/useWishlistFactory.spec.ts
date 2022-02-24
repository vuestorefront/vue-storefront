import { useWishlistFactory, UseWishlistFactoryParams } from '../../src/factories';
import { UseWishlist } from '../../src/types';
import { sharedRef } from '../../src/utils';

let useWishlist: () => UseWishlist<any, any, any>;
let params: UseWishlistFactoryParams<any, any, any>;
const customQuery = undefined;

function createComposable() {
  params = {
    load: jest.fn().mockResolvedValueOnce({ id: 'mocked_wishlist' }),
    addItem: jest.fn().mockResolvedValueOnce({ id: 'mocked_added_wishlist' }),
    isInWishlist: jest.fn().mockReturnValueOnce(true),
    clear: jest.fn().mockResolvedValueOnce({ id: 'mocked_cleared_wishlist' }),
    removeItem: jest
      .fn()
      .mockResolvedValueOnce({ id: 'mocked_removed_wishlist' })
  };
  useWishlist = useWishlistFactory<any, any, any>(params);
}

const factoryParams = {
  addItem: jest.fn(() => null),
  removeItem: jest.fn(),
  load: jest.fn(),
  clear: jest.fn(),
  isInWishlist: jest.fn()
};

const useWishlistMock = useWishlistFactory<any, any, any>(factoryParams);

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
      expect(params.load).not.toBeCalled();
    });
    it('set given wishlist', () => {
      const { wishlist, setWishlist } = useWishlist();
      expect(wishlist.value).toEqual(null);
      setWishlist({ wishlist: 'test' });
      expect(sharedRef).toHaveBeenCalled();
    });
  });

  describe('computes', () => {
    describe('isInWishlist', () => {
      it('should invoke implemented isInWishlist method', () => {
        const { isInWishlist } = useWishlist();
        const result = isInWishlist({ product: { id: 'productId' } });
        expect(result).toEqual(true);
        expect(params.isInWishlist).toBeCalledWith({
          currentWishlist: null,
          product: { id: 'productId' }
        });
      });
    });
  });

  describe('methods', () => {
    describe('load', () => {
      it('load the wishlist', async () => {
        createComposable();

        const { load, wishlist } = useWishlist();
        await load();
        expect(params.load).toHaveBeenCalledWith({ customQuery });
        expect(wishlist.value).toEqual({ id: 'mocked_wishlist' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.load.mockImplementationOnce(() => {
          throw err;
        });
        const { load, error } = useWishlistMock();

        await load();

        expect(error.value.load).toBe(err);
      });
    });

    describe('addItem', () => {
      it('should invoke adding to wishlist', async () => {
        const { addItem, wishlist } = useWishlist();
        await addItem({ product: { id: 'productId' } });
        expect(params.addItem).toHaveBeenCalledWith({
          currentWishlist: null,
          product: { id: 'productId' }
        });
        expect(wishlist.value).toEqual({ id: 'mocked_added_wishlist' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.addItem.mockImplementationOnce(() => {
          throw err;
        });
        const { addItem, error } = useWishlistMock();

        await addItem({
          product: { id: 'productId' }
        });

        expect(error.value.addItem).toBe(err);
      });
    });

    describe('removeItem', () => {
      it('should invoke adding to wishlist', async () => {
        const { removeItem, wishlist } = useWishlist();
        await removeItem({ product: { id: 'productId' } });
        expect(params.removeItem).toHaveBeenCalledWith({
          currentWishlist: null,
          product: { id: 'productId' }
        });
        expect(wishlist.value).toEqual({ id: 'mocked_removed_wishlist' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.removeItem.mockImplementationOnce(() => {
          throw err;
        });
        const { removeItem, error } = useWishlistMock();

        await removeItem({
          product: { id: 'productId' }
        });

        expect(error.value.removeItem).toBe(err);
      });
    });

    describe('clear', () => {
      it('should invoke clear', async () => {
        const { clear, wishlist } = useWishlist();
        await clear();
        expect(params.clear).toHaveBeenCalledWith({ currentWishlist: null });
        expect(wishlist.value).toEqual({ id: 'mocked_cleared_wishlist' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.clear.mockImplementationOnce(() => {
          throw err;
        });
        const { clear, error } = useWishlistMock();

        await clear();

        expect(error.value.clear).toBe(err);
      });
    });
  });
});
