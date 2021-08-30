import {
  getCartTotals,
  getCartShippingPrice,
  getCartItems,
  getCartItemName,
  getCartItemImage,
  getCartItemPrice,
  getCartItemAttributes,
  getCartItemSku,
  getCartTotalItems
} from './../../src/getters/cartGetters';
import { getProductAttributes } from './../../src/getters/productGetters';

import * as utils from './../../src/getters/_utils';

jest.spyOn(utils, 'createPrice').mockImplementation((product) => ({
  special: product?.price.value.centAmount / 100,
  regular: product?.price.value.centAmount / 100
} as any));

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
    centAmount: 3044
  },
  shippingInfo: {
    price: {
      centAmount: 444
    }
  }
} as any;

describe('[commercetools-getters] cart helpers', () => {
  it('returns default values', () => {
    expect(getCartItems(null)).toEqual([]);
  });

  it('returns products', () => {
    expect(getCartItems(cart)).toEqual(cart.lineItems);
  });

  it('returns cart total price', () => {
    expect(getCartTotals(null)).toEqual({
      special: 0,
      total: 0,
      subtotal: 0
    });
    expect(getCartTotals(cart).total).toEqual(30.44);
  });

  it('returns cart subtotal price', () => {
    expect(getCartTotals(cart).subtotal).toEqual(26);
  });

  it('returns cart shipping price', () => {
    expect(getCartShippingPrice(cart)).toEqual(4.44);
    expect(getCartShippingPrice({ ...cart,
      shippingInfo: null })).toEqual(0);

    expect(getCartShippingPrice({ ...cart,
      shippingInfo: {
        shippingMethod: {
          zoneRates: [
            {
              shippingRates: [
                {
                  freeAbove: {
                    centAmount: 1000
                  }
                }
              ]
            }
          ]
        }
      }
    })).toEqual(0);
  });

  it('returns cart total items', () => {
    expect(getCartTotalItems(null)).toEqual(0);
    expect(getCartTotalItems(cart)).toEqual(3);
  });

  it('returns cart product name', () => {
    expect(getCartItemName({ name: 'test' } as any)).toEqual('test');
  });

  it('returns cart product image', () => {
    expect(
      getCartItemImage({ variant: { images: [{ url: 'image.jpg' }]}} as any)
    ).toEqual('image.jpg');
  });

  it('returns cart product price', () => {
    expect(getCartItemPrice({ price: { value: { centAmount: 111 }}} as any)).toEqual({ regular: 1.11, special: 1.11 });
  });

  it('returns cart product attributes', () => {
    const args = {
      variant: 'test variant',
      filters: ['filter']
    };
    // eslint-disable-next-line
    (getProductAttributes as any) = jest.fn()
      .mockImplementation((variant, filters) => ({
        variant,
        filters
      }));

    expect(
      getCartItemAttributes({ variant: 'test variant' } as any, ['filter'])
    ).toEqual(args);
  });

  it('returns cart product sku', () => {
    expect(getCartItemSku({ variant: { sku: 'XXX1' }} as any)).toEqual('XXX1');
  });
});
