import {
  getCartProducts,
  getCartTotals,
  getCartShippingPrice,
  getCartTotalItems,
  getCartProductName,
  getCartProductPrice,
  getCartProductImage,
  getCartProductSku,
  getCartProductAttributes,
  getProductAttributes
} from './../src/index';

const price = (p) => ({ value: { centAmount: p } });
const variant = (p = {}) => ({
  ...p,
  images: [{ url: 'a.jpg' }, { url: 'b.jpg' }]
});

const cart = {
  lineItems: [
    { name: 'prod1',
      id: 1,
      price: price(1100),
      variant: variant(),
      quantity: 1
    },
    { name: 'prod2',
      id: 2,
      price: price(1500),
      variant: variant(),
      quantity: 2
    }
  ],
  totalPrice: {
    centAmount: 12444
  },
  shippingInfo: {
    price: {
      centAmount: 444
    }
  }
} as any;

describe('[commercetools-helpers] cart helpers', () => {
  it('returns default values', () => {
    expect(getCartProducts(null)).toEqual([]);
  });

  it('returns products', () => {
    expect(getCartProducts(cart)).toEqual(cart.lineItems);
  });

  it('returns cart total price', () => {
    expect(getCartTotals(null)).toEqual({
      total: 0,
      subtotal: 0
    });
    expect(getCartTotals(cart).total).toEqual(128.88);
    expect(getCartTotals({
      ...cart,
      shippingInfo: null
    }).total).toEqual(124.44);
  });

  it('returns cart subtotal price', () => {
    expect(getCartTotals(cart).subtotal).toEqual(124.44);
    expect(getCartTotals({
      ...cart,
      shippingInfo: null
    }).subtotal).toEqual(124.44);
  });

  it('returns cart shipping price', () => {
    expect(getCartShippingPrice(cart)).toEqual(4.44);
    expect(getCartShippingPrice({ ...cart,
      shippingInfo: null })).toEqual(0);
  });

  it('returns cart total items', () => {
    expect(getCartTotalItems(null)).toEqual(0);
    expect(getCartTotalItems(cart)).toEqual(3);
  });

  it('returns cart product name', () => {
    expect(getCartProductName({ name: 'test' } as any)).toEqual('test');
  });

  it('returns cart product image', () => {
    expect(
      getCartProductImage({ variant: { images: [{ url: 'image.jpg' }]}} as any)
    ).toEqual('image.jpg');
  });

  it('returns cart product price', () => {
    expect(getCartProductPrice({ price: { value: { centAmount: 111 }}} as any)).toEqual(1.11);
  });

  it('returns cart product attributes', () => {
    const args = {
      variant: 'test variant',
      filters: ['filter']
    };
    (getProductAttributes as any) = jest.fn()
      .mockImplementation((variant, filters) => ({
        variant,
        filters
      }));

    expect(
      getCartProductAttributes({ variant: 'test variant' } as any, ['filter'])
    ).toEqual(args);
  });

  it('returns cart product sku', () => {
    expect(getCartProductSku({ variant: { sku: 'XXX1' }} as any)).toEqual('XXX1');
  });
});
