import { useCart } from './../../src/useCart';
import loadCurrentCart from './../../src/useCart/currentCart';
import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateCartQuantity as apiUpdateCartQuantity
} from '@vue-storefront/commercetools-api';

jest.mock('./../../src/useCart/currentCart');
jest.mock('@vue-storefront/commercetools-api', () => ({
  addToCart: jest.fn(() => ({ data: { cart: 'some cart' } })),
  removeFromCart: jest.fn(() => ({ data: { cart: 'some cart' } })),
  updateCartQuantity: jest.fn(() => ({ data: { cart: 'some cart' } })),
  applyCartCoupon: jest.fn(() => ({ data: { cart: 'some cart' } })),
  removeCartCoupon: jest.fn(() => ({ data: { cart: 'current cart' } }))
}));

jest.mock('@vue-storefront/core', () => ({
  useCartFactory: (params) => ({
    useCart: () => params
  })
}));

describe('[commercetools-composables] useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current cart', async () => {
    const { loadCart } = useCart() as any;

    loadCart();

    expect(loadCurrentCart).toBeCalled();
  });

  it('adds to cart', async () => {
    const { addToCart } = useCart() as any;
    const response = await addToCart({ currentCart: 'current cart', product: 'product1', quantity: 3 });

    expect(response).toEqual('some cart');
    expect(apiAddToCart).toBeCalledWith('current cart', 'product1', 3);
  });

  it('removes from cart', async () => {
    const { removeFromCart } = useCart() as any;
    const response = await removeFromCart({ currentCart: 'current cart', product: 'product1' });

    expect(response).toEqual('some cart');
    expect(apiRemoveFromCart).toBeCalledWith('current cart', 'product1');
  });

  it('updates quantity', async () => {
    const { updateQuantity } = useCart() as any;
    const response = await updateQuantity({
      currentCart: 'current cart',
      product: { name: 'product1' },
      quantity: 5
    });

    expect(response).toEqual('some cart');
    expect(apiUpdateCartQuantity).toBeCalledWith('current cart', { name: 'product1', quantity: 5 });
  });

  it('clears cart', async () => {
    const { clearCart } = useCart() as any;
    const response = await clearCart({ currentCart: 'current cart' });

    expect(response).toEqual('current cart');
  });

  it('applies coupon', async () => {
    const { applyCoupon } = useCart() as any;
    const response = await applyCoupon({ currentCart: 'current cart', coupon: 'X123' });

    expect(response).toEqual({ updatedCart: 'some cart', updatedCoupon: 'X123' });
  });

  it('removes coupon', async () => {
    const { removeCoupon } = useCart() as any;
    const response = await removeCoupon({ currentCart: 'current cart' });

    expect(response).toEqual({ updatedCart: 'current cart' });
  });

  it('checks if you are on cart', () => {
    const { isOnCart } = useCart() as any;
    const response = isOnCart({ currentCart: 'current cart' });

    expect(response).toBeTruthy();
  });
});
