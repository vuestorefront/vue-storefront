import { useCartFactory, UseCartFactoryParams } from '../../src/factories';
import { UseCart } from '../../src/types';
import { sharedRef } from '../../src/utils';

let useCart: () => UseCart<any, any, any>;
let params: UseCartFactoryParams<any, any, any>;

function createComposable() {
  params = {
    load: jest.fn().mockResolvedValueOnce({ id: 'mocked_cart' }),
    addItem: jest.fn().mockResolvedValueOnce({ id: 'mocked_added_cart' }),
    removeItem: jest
      .fn()
      .mockResolvedValueOnce({ id: 'mocked_removed_cart' }),
    updateItemQty: jest
      .fn()
      .mockResolvedValueOnce({ id: 'mocked_updated_quantity_cart' }),
    clear: jest.fn().mockResolvedValueOnce({ id: 'mocked_cleared_cart' }),
    applyCoupon: jest.fn().mockResolvedValueOnce({
      updatedCart: { id: 'mocked_apply_coupon_cart' },
      updatedCoupon: 'appliedCouponMock'
    }),
    removeCoupon: jest.fn().mockResolvedValueOnce({
      updatedCart: { id: 'mocked_removed_coupon_cart' }
    }),
    isInCart: jest.fn().mockReturnValueOnce(true)
  };
  useCart = useCartFactory<any, any, any, any>(params);
}

const factoryParams = {
  addItem: jest.fn(() => null),
  removeItem: jest.fn(),
  updateItemQty: jest.fn(),
  load: jest.fn(),
  clear: jest.fn(),
  applyCoupon: jest.fn(),
  removeCoupon: jest.fn(),
  isInCart: jest.fn()
};

const useCartMock = useCartFactory(factoryParams);

describe('[CORE - factories] useCartFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createComposable();
  });

  describe('initial setup', () => {
    it('should have proper initial properties', async () => {
      const { cart, loading } = useCart();

      expect(cart.value).toEqual(null);
      expect(loading.value).toEqual(false);
    });

    it('should not load cart if is provided during factory creation', () => {
      createComposable();
      useCart();
      expect(params.load).not.toBeCalled();
    });
    it('set given cart', () => {
      const { cart, setCart } = useCart();
      expect(cart.value).toEqual(null);
      setCart({ cart: 'test' });
      expect(sharedRef).toHaveBeenCalled();
    });
  });

  describe('computes', () => {
    describe('isInCart', () => {
      it('should invoke implemented isInCart method', () => {
        const { isInCart } = useCart();
        const result = isInCart({ product: { id: 'productId' } });
        expect(result).toEqual(true);
        expect(params.isInCart).toBeCalledWith({
          currentCart: null,
          product: { id: 'productId' }
        });
      });
    });
  });

  describe('methods', () => {
    describe('load', () => {
      it('load the cart', async () => {
        createComposable();

        const { load, cart } = useCart();
        await load();
        await load();
        expect(params.load).toHaveBeenCalled();
        expect(cart.value).toEqual({ id: 'mocked_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.load.mockImplementationOnce(() => {
          throw err;
        });
        const { load, error } = useCartMock();

        await load();

        expect(error.value.load).toBe(err);
      });
    });

    describe('addItem', () => {
      it('should invoke adding to cart', async () => {
        const { addItem, cart } = useCart();
        await addItem({ product: { id: 'productId' }, quantity: 2});
        expect(params.addItem).toHaveBeenCalledWith({
          currentCart: null,
          product: { id: 'productId' },
          quantity: 2
        });
        expect(cart.value).toEqual({ id: 'mocked_added_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.addItem.mockImplementationOnce(() => {
          throw err;
        });
        const { addItem, error } = useCartMock();

        await addItem({ product: { id: 'productId' }, quantity: 1 });

        expect(error.value.addItem).toBe(err);
      });
    });

    describe('removeItem', () => {
      it('should invoke adding to cart', async () => {
        const { removeItem, cart } = useCart();
        await removeItem({ product: { id: 'productId' }});
        expect(params.removeItem).toHaveBeenCalledWith({
          currentCart: null,
          product: { id: 'productId' }
        });
        expect(cart.value).toEqual({ id: 'mocked_removed_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.removeItem.mockImplementationOnce(() => {
          throw err;
        });
        const { removeItem, error } = useCartMock();

        await removeItem({ product: { id: 'productId' } });

        expect(error.value.removeItem).toBe(err);
      });
    });

    describe('updateItemQty', () => {
      it('should not invoke quantity update if quantity is not provided', async () => {
        const { updateItemQty } = useCart();
        await updateItemQty({ product: { id: 'productId' } });
        expect(params.updateItemQty).not.toBeCalled();
      });

      it('should not invoke quantity update if quantity is lower than 1', async () => {
        const { updateItemQty } = useCart();
        await updateItemQty({ product: { id: 'productId' }, quantity: 0 });
        expect(params.updateItemQty).not.toBeCalled();
      });

      it('should invoke quantity update', async () => {
        const { updateItemQty, cart } = useCart();
        await updateItemQty({ product: { id: 'productId' }, quantity: 2 });
        expect(params.updateItemQty).toHaveBeenCalledWith({
          currentCart: null,
          product: { id: 'productId' },
          quantity: 2
        });
        expect(cart.value).toEqual({ id: 'mocked_updated_quantity_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.updateItemQty.mockImplementationOnce(() => {
          throw err;
        });
        const { updateItemQty, error } = useCartMock();

        await updateItemQty({ product: { id: 'productId' }, quantity: 1 });

        expect(error.value.updateItemQty).toBe(err);
      });
    });

    describe('clear', () => {
      it('should invoke clear', async () => {
        const { clear, cart } = useCart();
        await clear();
        expect(params.clear).toHaveBeenCalledWith({ currentCart: null });
        expect(cart.value).toEqual({ id: 'mocked_cleared_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.clear.mockImplementationOnce(() => {
          throw err;
        });
        const { clear, error } = useCartMock();

        await clear();

        expect(error.value.clear).toBe(err);
      });
    });

    describe('applyCoupon', () => {
      it('should apply provided coupon', async () => {
        const { applyCoupon, cart } = useCart();
        await applyCoupon({ couponCode: 'qwerty' });
        expect(params.applyCoupon).toHaveBeenCalledWith({
          currentCart: null,
          couponCode: 'qwerty'
        });
        expect(cart.value).toEqual({ id: 'mocked_apply_coupon_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.applyCoupon.mockImplementationOnce(() => {
          throw err;
        });
        const { applyCoupon, error } = useCartMock();

        await applyCoupon({ couponCode: 'qwerty' });

        expect(error.value.applyCoupon).toBe(err);
      });
    });

    describe('removeCoupon', () => {
      it('should remove existing coupon', async () => {
        const { removeCoupon, cart } = useCart();
        const couponCode = 'some-coupon-code-12321231';
        await removeCoupon({ couponCode });
        expect(params.removeCoupon).toHaveBeenCalledWith({
          currentCart: null,
          couponCode
        });
        expect(cart.value).toEqual({ id: 'mocked_removed_coupon_cart' });
      });

      it('should set error if factory method throwed', async () => {
        const err = new Error('zxczxcx');
        factoryParams.removeCoupon.mockImplementationOnce(() => {
          throw err;
        });
        const { removeCoupon, error } = useCartMock();
        const couponCode = 'some-coupon-code-12321231';

        await removeCoupon({ couponCode });

        expect(error.value.removeCoupon).toBe(err);
      });

      // TODO
      // it('should not invoke removeCoupon method if coupon is not applied', async () => {
      // });
    });
  });
});
