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
    const currentCart = { id: 1, version: 1 };
    const response = await addItem(context, { currentCart, product: 'product1', quantity: 3 });

    expect(response).toEqual('some cart');
    expect(context.$ct.api.addToCart).toBeCalledWith(currentCart, 'product1', 3, customQuery);
  });

  it('creates a new cart and add an item', async () => {
    const { addItem } = useCart() as any;
    (loadCurrentCart as any).mockReturnValue('some cart');
    const response = await addItem(context, { currentCart: null, product: 'product1', quantity: 3 });
    expect(loadCurrentCart).toBeCalled();

    expect(response).toEqual('some cart');
    expect(context.$ct.api.addToCart).toBeCalledWith({ id: undefined, version: undefined }, 'product1', 3, customQuery);
  });

  it('removes from cart', async () => {
    const { removeItem } = useCart() as any;
    const currentCart = { id: 1, version: 1 };
    const response = await removeItem(context, { currentCart, product: 'product1' });

    expect(response).toEqual('some cart');
    expect(context.$ct.api.removeFromCart).toBeCalledWith(currentCart, 'product1', customQuery);
  });

  it('updates quantity', async () => {
    const { updateItemQty } = useCart() as any;
    const currentCart = { id: 1, version: 1 };
    const response = await updateItemQty(context, {
      currentCart,
      product: { name: 'product1' },
      quantity: 5
    });

    expect(response).toEqual('some cart');
    expect(context.$ct.api.updateCartQuantity).toBeCalledWith(currentCart, { name: 'product1', quantity: 5 }, customQuery);
  });

  it('clears cart', async () => {
    const { clear } = useCart() as any;
    const currentCart = { id: 1, version: 1 };
    const response = await clear(context, { currentCart });

    expect(response).toEqual(currentCart);
  });

  it('applies coupon', async () => {
    const { applyCoupon } = useCart() as any;
    const currentCart = { id: 1, version: 1 };
    const response = await applyCoupon(context, { currentCart, coupon: 'X123' });

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
