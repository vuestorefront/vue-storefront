import {
  getWishlistTotals,
  getWishlistShippingPrice,
  getWishlistItems,
  getWishlistItemName,
  getWishlistItemImage,
  getWishlistItemPrice,
  getWishlistItemSku,
  getWishlistItemQty,
  getWishlistTotalItems,
  getWishlistItemAttributes,
  getFormattedPrice
} from '../../../src/composables/getters/wishlistGetters';

jest.mock('@vue-storefront/about-you-api', () => ({
  getSettings: () => ({
    imgUrl: 'ayc.com'
  })
}));

const wishlist = {
  key: 'a',
  items: [
    {
      key: 'a1',
      product: {
        id: '1'
      }
    }, {
      key: 'a2',
      product: {
        id: '1'
      }
    }
  ]
} as any;

describe('[about-you-cloud-getters] wishlist getters', () => {
  it('returns default values', () => {
    expect(getWishlistItems(null)).toEqual([]);
  });

  it('returns wishlist shipping price', () => {
    expect(getWishlistShippingPrice(wishlist)).toBe(null);
  });

  it('returns products', () => {
    expect(getWishlistItems(wishlist)).toEqual(wishlist.items);
  });

  it('returns wishlist total price', () => {
    expect(getWishlistTotals(null)).toEqual({
      total: 0,
      subtotal: 0
    });
    expect(getWishlistTotals(wishlist).total).toEqual(0);
    expect(getWishlistTotals({
      ...wishlist,
      shippingInfo: null
    }).total).toEqual(0);
  });

  it('returns wishlist subtotal price', () => {
    expect(getWishlistTotals(wishlist).subtotal).toEqual(0);
    expect(getWishlistTotals({
      ...wishlist,
      shippingInfo: null
    }).subtotal).toEqual(0);
  });

  it('returns wishlist total items', () => {
    expect(getWishlistTotalItems(null)).toEqual(0);
    expect(getWishlistTotalItems(wishlist)).toEqual(2);
  });

  it('returns wishlist product name', () => {
    const mockedProductNameAttr = {
      advancedAttributes: {
        productName: {
          values: [{
            fieldSet: [[{
              value: 'test'
            }
            ]]
          }]
        }
      }
    };
    expect(getWishlistItemName({ product: mockedProductNameAttr } as any)).toEqual('test');
  });

  it('returns wishlist product image', () => {
    expect(
      getWishlistItemImage({
        product: { images: [{ hash: 'images/99c1' }] }
      } as any)
    ).toEqual('ayc.com/images/99c1');
  });

  it('returns wishlist product price', () => {
    expect(
      getWishlistItemPrice({
        product: {
          priceRange: {
            max: { withoutTax: 11450 },
            min: { withoutTax: 11400 }
          }
        }
      } as any)
    ).toEqual({ regular: 11450, special: 11400 });
  });

  it('returns wishlist product attributes', () => {
    expect(getWishlistItemAttributes(wishlist)).toEqual(undefined);
  });
  it('returns wishlist item qty', () => {
  });
  expect(getWishlistItemQty(wishlist)).toEqual(null);

  it('returns wishlist product sku', () => {
    expect(getWishlistItemSku(null as any)).toEqual('');
    expect(getWishlistItemSku({ product: {id: 1123}} as any)).toEqual('1123');
  });
});

it('return formatted price', () => {
  expect(getFormattedPrice(11450)).toEqual('11450€');
  expect(getFormattedPrice(null)).toEqual('0€');
});
