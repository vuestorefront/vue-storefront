import {
  getCartTotals,
  getCartShippingPrice,
  getCartItems,
  getCartItemName,
  getCartItemImage,
  getCartItemPrice,
  getCartItemQty,
  getCartItemAttributes,
  getCartItemSku,
  getCartTotalItems
} from '../../../src/composables/getters/cartGetters';

import {
  getProductCoverImage,
  getProductName,
  getProductPrice,
  getProductId,
  getProductAttributes
} from '../../../src/composables/getters/productGetters';

jest.mock('../../../src/composables/getters/productGetters', () => ({
  getProductCoverImage: jest.fn(),
  getProductName: jest.fn(),
  getProductPrice: jest.fn(),
  getFormattedPrice: jest.fn(),
  getProductId: jest.fn(),
  getProductAttributes: jest.fn()
}));

const cart = {
  key: '1111-2222-3333-4444-1589274233364',
  items: [
    {
      key: 'a1bac123ab1b213ab2131b89ba76ad71',
      quantity: 1,
      price: {
        total: {
          withTax: 13626,
          withoutTax: 11450
        }
      },
      variant: {
        id: 38346771,
        referenceKey: '578902-00-0',
        price: {
          withTax: 13626,
          withoutTax: 11450,
          tax: {
            vat: {
              amount: 2176,
              rate: 0.19
            }
          }
        }
      },
      product: {
        id: 3769863,
        masterKey: '578902-00_M',
        referenceKey: '578902-00',
        attributes: {
          material: {
            id: 257,
            key: 'material',
            label: 'Material',
            values: {
              id: 73347,
              label: 'Cotton',
              value: 'cotton'
            }
          }
        },
        advancedAttributes: {
          productName: {
            id: 1529,
            key: 'productName',
            label: 'Product Name',
            type: '',
            values: [
              {
                fieldSet: [
                  [
                    {
                      value: 'T-Shirt Majestic Filatures grau'
                    }
                  ]
                ]
              }
            ]
          }
        },
        images: [
          {
            hash: 'images/99c12be1f8388824a1fa64d222c6f269',
            attributes: {
              imageBackground: {
                id: 1258,
                key: 'imageBackground',
                label: 'Bild Hintergrund',
                values: {
                  id: 66504,
                  label: 'weiß',
                  value: 'white'
                }
              }
            }
          }
        ],
        variants: [
          {
            id: 38346771,
            price: {
              withTax: 13626,
              withoutTax: 11450
            }
          }
        ],
        priceRange: {
          min: {
            withTax: 10900,
            withoutTax: 9160
          },
          max: {
            withTax: 13626,
            withoutTax: 11450
          }
        }
      }
    }
  ],
  cost: {
    withTax: 13626,
    withoutTax: 11450
  }
} as any;

describe('[about-you-composables] cart getters', () => {
  it('returns empty array when cart doesn\'t exist', () => {
    expect(getCartItems(null)).toEqual([]);
  });

  it('returns products existing in the cart', () => {
    expect(getCartItems(cart)).toEqual(cart.items);
  });

  it('returns cart total price', () => {
    expect(getCartTotals(null).total).toEqual(0);
    expect(getCartTotals(cart).total).toEqual(136.26);
  });

  it('returns cart subtotal price', () => {
    expect(getCartTotals(null).subtotal).toEqual(0);
    expect(getCartTotals(cart).subtotal).toEqual(114.5);
  });

  it('returns cart shipping price', () => {
    // unavailable
    expect(getCartShippingPrice(cart)).toEqual(0);
  });

  it('returns cart total items', () => {
    expect(getCartTotalItems(null)).toEqual(0);
    expect(getCartTotalItems(cart)).toEqual(1);
  });

  it('returns cart product name', () => {
    expect(getCartItemName(null)).toEqual('');
    (getProductName as jest.Mock).mockReturnValueOnce('T-Shirt Majestic Filatures grau');
    expect(getCartItemName(cart.items[0])).toEqual('T-Shirt Majestic Filatures grau');
  });

  it('returns cart product image', () => {
    expect(getCartItemImage(null)).toEqual('');
    (getProductCoverImage as jest.Mock).mockReturnValueOnce('domain.tld/image.jpg');
    expect(getCartItemImage(cart.items[0])).toEqual('domain.tld/image.jpg');
  });

  it('returns cart product price', () => {
    expect(getCartItemPrice(null)).toEqual({ regular: 0, special: 0 });
    (getProductPrice as jest.Mock).mockReturnValueOnce({ regular: 1.11, special: 1.11 });
    expect(getCartItemPrice(cart.items[0])).toEqual({ regular: 1.11, special: 1.11 });
  });

  it('returns cart product quantity', () => {
    expect(getCartItemQty(null)).toEqual(0);
    expect(getCartItemQty(cart.items[0])).toEqual(1);
  });

  it('returns cart product attributes', () => {
    expect(
      getCartItemAttributes(null, ['material'])
    ).toEqual({});

    const args = {
      material: {
        name: 'material',
        label: 'Material',
        value: 'silk'
      }
    };
    (getProductAttributes as jest.Mock).mockReturnValueOnce(args);

    expect(
      getCartItemAttributes(cart.items[0], ['material'])
    ).toEqual(args);
  });

  it('returns cart product sku', () => {
    expect(getCartItemSku(null)).toEqual('');
    (getProductId as jest.Mock).mockReturnValueOnce('1234');
    expect(getCartItemSku(cart.items[0])).toEqual('1234');
  });
});
