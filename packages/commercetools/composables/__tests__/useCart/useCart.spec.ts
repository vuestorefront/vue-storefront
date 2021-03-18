import useCart from './../../src/useCart';
import loadCurrentCart from './../../src/useCart/currentCart';

const context = {
  $ct: {
    api: {
      addToCart: jest.fn(() => ({ data: { cart: 'some cart' } })),
      removeFromCart: jest.fn(() => ({ data: { cart: 'some cart' } })),
      updateCartQuantity: jest.fn(() => ({ data: { cart: 'some cart' } })),
      applyCartCoupon: jest.fn(() => ({ data: { cart: 'some cart' } })),
      removeCartCoupon: jest.fn(() => ({ data: { cart: 'current cart' } })),
      getSettings: jest.fn(() => ({ currentToken: 1 })),
      isTokenUserSession: jest.fn()
    }
  }
};

jest.mock('./../../src/useCart/currentCart');
jest.mock('@vue-storefront/core', () => ({
  useCartFactory: (params) => () => params
}));

const customQuery = undefined;

describe('[commercetools-composables] useCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds to cart', async () => {
    const { addItem } = useCart() as any;
    const response = await addItem(context, { currentCart: 'current cart', product: 'product1', quantity: 3 });

    expect(response).toEqual('some cart');
    expect(context.$ct.api.addToCart).toBeCalledWith('current cart', 'product1', 3, customQuery);
  });

  it('creates a new cart and add an item', async () => {
    const { addItem } = useCart() as any;
    (loadCurrentCart as any).mockReturnValue('some cart');
    const response = await addItem(context, { currentCart: null, product: 'product1', quantity: 3 });
    expect(loadCurrentCart).toBeCalled();

    expect(response).toEqual('some cart');
    expect(context.$ct.api.addToCart).toBeCalledWith('some cart', 'product1', 3, customQuery);
  });

  it('removes from cart', async () => {
    const { removeItem } = useCart() as any;
    const response = await removeItem(context, { currentCart: 'current cart', product: 'product1' });

    expect(response).toEqual('some cart');
    expect(context.$ct.api.removeFromCart).toBeCalledWith('current cart', 'product1', customQuery);
  });

  it('updates quantity', async () => {
    const { updateItemQty } = useCart() as any;
    const response = await updateItemQty(context, {
      currentCart: 'current cart',
      product: { name: 'product1' },
      quantity: 5
    });

    expect(response).toEqual('some cart');
    expect(context.$ct.api.updateCartQuantity).toBeCalledWith('current cart', { name: 'product1', quantity: 5 }, customQuery);
  });

  it('clears cart', async () => {
    const { clear } = useCart() as any;
    const response = await clear(context, { currentCart: 'current cart' });

    expect(response).toEqual('current cart');
  });

  it('applies coupon', async () => {
    const { applyCoupon } = useCart() as any;
    const response = await applyCoupon(context, { currentCart: 'current cart', coupon: 'X123' });

    expect(response).toEqual({ updatedCart: 'some cart' });
  });

  it('removes coupon', async () => {
    const { removeCoupon } = useCart() as any;
    const response = await removeCoupon(context, {
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

  describe('isInCart', () => {
    const { isInCart } = useCart() as any;

    it('returns false if product does not exists in cart', () => {
      const currentCart: any = {
        lineItems: []
      };

      const product: any = {
        _id: 123
      };

      expect(isInCart(context, { currentCart, product })).toEqual(false);
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

      expect(isInCart(context, { currentCart, product })).toEqual(true);
    });
  });

});
