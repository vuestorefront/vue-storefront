import { useCart } from './../../src/useCart';
import loadCurrentCart from './../../src/useCart/currentCart';
import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity,
  isTokenUserSession
} from '@vue-storefront/commercetools-api';

jest.mock('./../../src/useCart/currentCart');
jest.mock('@vue-storefront/commercetools-api', () => ({
  addToCart: jest.fn(() => ({ data: { cart: 'some cart' } })),
  removeFromCart: jest.fn(() => ({ data: { cart: 'some cart' } })),
  updateCartQuantity: jest.fn(() => ({ data: { cart: 'some cart' } })),
  applyCartCoupon: jest.fn(() => ({ data: { cart: 'some cart' } })),
  removeCartCoupon: jest.fn(() => ({ data: { cart: 'current cart' } })),
  getSettings: jest.fn(() => ({ currentToken: 1 })),
  isTokenUserSession: jest.fn()
}));

jest.mock('@vue-storefront/core', () => ({
  useCartFactory: (params) => ({
    useCart: () => params
  })
}));

const customQuery = undefined;

describe('[commercetools-composables] useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current cart when there is user session', async () => {
    (isTokenUserSession as any).mockReturnValue(true);
    const { loadCart } = useCart() as any;

    loadCart();

    expect(loadCurrentCart).toBeCalled();
  });

  it('does not loads cart without user session', async () => {
    (isTokenUserSession as any).mockReturnValue(false);
    const { loadCart } = useCart() as any;

    loadCart();

    expect(loadCurrentCart).not.toBeCalled();
  });

  it('adds to cart', async () => {
    const { addToCart } = useCart() as any;
    const response = await addToCart({ currentCart: 'current cart', product: 'product1', quantity: 3 });

    expect(response).toEqual('some cart');
    expect(apiAddToCart).toBeCalledWith('current cart', 'product1', 3, customQuery);
  });

  it('creates a new cart and add an item', async () => {
    const { addToCart } = useCart() as any;
    (loadCurrentCart as any).mockReturnValue('some cart');
    const response = await addToCart({ currentCart: null, product: 'product1', quantity: 3 });
    expect(loadCurrentCart).toBeCalled();

    expect(response).toEqual('some cart');
    expect(apiAddToCart).toBeCalledWith('some cart', 'product1', 3, customQuery);
  });

  it('removes from cart', async () => {
    const { removeFromCart } = useCart() as any;
    const response = await removeFromCart({ currentCart: 'current cart', product: 'product1' });

    expect(response).toEqual('some cart');
    expect(apiRemoveFromCart).toBeCalledWith('current cart', 'product1', customQuery);
  });

  it('updates quantity', async () => {
    const { updateQuantity } = useCart() as any;
    const response = await updateQuantity({
      currentCart: 'current cart',
      product: { name: 'product1' },
      quantity: 5
    });

    expect(response).toEqual('some cart');
    expect(apiUpdateCartQuantity).toBeCalledWith('current cart', { name: 'product1', quantity: 5 }, customQuery);
  });

  it('clears cart', async () => {
    const { clearCart } = useCart() as any;
    const response = await clearCart({ currentCart: 'current cart' });

    expect(response).toEqual('current cart');
  });

  it('applies coupon', async () => {
    const { applyCoupon } = useCart() as any;
    const response = await applyCoupon({ currentCart: 'current cart', coupon: 'X123' });

    expect(response).toEqual({ updatedCart: 'some cart' });
  });

  it('removes coupon', async () => {
    const { removeCoupon } = useCart() as any;
    const response = await removeCoupon({
      currentCart: {
        discountCodes: [
          {
            discountCode: {
              id: 'asdasdas',
              name: 'asdasdas',
              code: 'XA12345'
            }
          }
        ]
      },
      coupon: { id: 'asdasdas' }
    });

    expect(response).toEqual({ updatedCart: 'current cart' });
  });

  describe('isOnCart', () => {
    const { isOnCart } = useCart() as any;

    it('returns false if product does not exists in cart', () => {
      const currentCart: any = {
        lineItems: []
      };

      const product: any = {
        _id: 123
      };

      expect(isOnCart({ currentCart, product })).toEqual(false);
    });

    it('returns true if product exists in cart', () => {
      const currentCart: any = {
        lineItems: [{
          productId: 123
        }]
      };

      const product: any = {
        _id: 123
      };

      expect(isOnCart({ currentCart, product })).toEqual(true);
    });
  });

});
