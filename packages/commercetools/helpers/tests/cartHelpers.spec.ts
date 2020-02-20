import { getCartProducts, getCartTotalPrice, getCartSubtotalPrice, getCartShippingPrice, getCartTotalItems } from './../src/index';

const price = (p) => ({ value: { centAmount: p } });
const variant = (p = {}) => ({ ...p,
  images: [{ url: 'a.jpg' }, { url: 'b.jpg' }] });
const rawConfiguration = [
  { name: 'size',
    label: '38',
    stringValue: '38',
    __typename: 'StringAttribute' },
  { name: 'color',
    label: 'white',
    stringValue: 'white',
    __typename: 'StringAttribute' }
];

const configuration = [
  { name: 'size',
    label: '38',
    value: '38' },
  { name: 'color',
    label: 'white',
    value: 'white' }
];

const cart = {
  lineItems: [
    { name: 'prod1',
      id: 1,
      price: price(1100),
      variant: variant(),
      quantity: 1,
      _configuration: rawConfiguration },
    { name: 'prod2',
      id: 2,
      price: price(1500),
      variant: variant(),
      quantity: 2,
      _configuration: rawConfiguration }
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
    expect(getCartProducts(cart)).toEqual([
      { title: 'prod1',
        id: 1,
        price: { regular: 11 },
        image: 'a.jpg',
        qty: 1,
        configuration: configuration },
      { title: 'prod2',
        id: 2,
        price: { regular: 15 },
        image: 'a.jpg',
        qty: 2,
        configuration: configuration }
    ]);
  });

  it('returns products with whitelisted attributes', () => {
    expect(getCartProducts(cart, ['color'])).toEqual([
      { title: 'prod1',
        id: 1,
        price: { regular: 11 },
        image: 'a.jpg',
        qty: 1,
        configuration: [{ name: 'color',
          label: 'white',
          value: 'white' }] },
      { title: 'prod2',
        id: 2,
        price: { regular: 15 },
        image: 'a.jpg',
        qty: 2,
        configuration: [{ name: 'color',
          label: 'white',
          value: 'white' }] }
    ]);
  });

  it('returns cart total price', () => {
    expect(getCartTotalPrice(null)).toEqual(0);
    expect(getCartTotalPrice(cart)).toEqual(128.88);
    expect(getCartTotalPrice({ ...cart,
      shippingInfo: null })).toEqual(124.44);
  });

  it('returns cart subtotal price', () => {
    expect(getCartSubtotalPrice(cart)).toEqual(124.44);
    expect(getCartSubtotalPrice({ ...cart,
      shippingInfo: null })).toEqual(124.44);
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
});
