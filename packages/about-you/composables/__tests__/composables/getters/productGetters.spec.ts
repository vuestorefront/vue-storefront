import {
  getProductName,
  getProductDescription,
  getProductSlug,
  getProductPrice,
  getProductGallery,
  getProductFiltered,
  getProductAttributes,
  getProductCategoryIds,
  getProductId
} from '../../../src/composables/getters/productGetters';

jest.mock('@vue-storefront/about-you-api', () => ({
  getSettings: () => ({
    imgUrl: 'ayc.com'
  })
}));

const product = {
  id: 1234,
  advancedAttributes: {
    description: {
      values: [{
        fieldSet: [[{
          value: 'Product 1 Description'
        }
        ]]
      }]
    },
    productName: {
      values: [{
        fieldSet: [[{
          value: 'Product Name 1'
        }
        ]]
      }]
    },
    productNameSlug: {
      values: [{
        fieldSet: [[{
          value: 'product-name-1'
        }
        ]]
      }]
    }
  },
  categories: [
    [{
      categoryId: 344491
    }],
    [{
      categoryId: 344491
    },
    {
      categoryId: 344500
    }
    ]],
  images: [{ hash: 'images/99c1' }, { hash: 'images/99c2'}],
  priceRange: { max: { withoutTax: 11450 }}
} as any;

describe('[commercetools-getters] product getters', () => {
  it('returns default values', () => {
    expect(getProductName(null)).toBe('');
    expect(getProductSlug(null)).toBe('');
    expect(getProductDescription(null)).toBe('');
    expect(getProductPrice(null)).toEqual({ regular: 0, special: 0 });
    expect(getProductGallery(null)).toEqual([]);
    expect(getProductFiltered(null)).toEqual([]);
    expect(getProductCategoryIds(null)).toEqual([]);
    expect(getProductAttributes(null)).toEqual({});
  });

  it('returns name', () => {
    expect(getProductName(product)).toBe('Product Name 1');
  });

  it('returns slug', () => {
    expect(getProductSlug(product)).toBe('1234');
  });

  it('returns description', () => {
    expect(getProductDescription(product)).toBe('Product 1 Description');
  });

  it('returns price', () => {
    expect(getProductPrice(product)).toEqual({ regular: 11450, special: 11450 });
  });

  it('returns gallery', () => {
    expect(getProductGallery(product)).toEqual([
      {
        big: 'ayc.com/images/99c1',
        normal: '',
        small: ''
      },
      {
        big: 'ayc.com/images/99c2',
        normal: '',
        small: ''
      }
    ]);
  });
  it('returns product categories', () => {
    expect(getProductCategoryIds(product)).toEqual([
      '344491',
      '344500'
    ]);
  });

  it('returns product ID', () => {
    expect(getProductId(product)).toEqual('1234');
  });

  it('returns empty array if there is no product', () => {
  });
});
