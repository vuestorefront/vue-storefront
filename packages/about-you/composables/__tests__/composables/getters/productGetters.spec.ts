import {
  getProductName,
  getProductDescription,
  getProductSlug,
  getProductPrice,
  getProductGallery,
  getProductFiltered,
  getProductAttributes,
  getProductCategoryIds,
  getProductId,
  getProductCoverImage,
  getFormattedPrice,
  getProductMultiAttributeValue
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
        ]],
        groupSet: [[{
          value: 'product-name'
        }]]
      }]
    }
  },
  attributes: {
    color: {
      values: 'blue',
      label: 'blue'
    },
    size: {
      values: 'XL',
      label: 'xl'
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
  priceRange: { max: { withoutTax: 11450 }, min: {withoutTax: 11400}}
} as any;

describe('[about-you-composables] product getters', () => {
  it('returns default values', () => {
    expect(getProductName(null)).toBe('');
    expect(getProductSlug(null)).toBe('');
    expect(getProductDescription(null)).toBe('');
    expect(getProductCoverImage(null)).toEqual(null);
    expect(getProductPrice(null)).toEqual({ regular: 0, special: null });
    expect(getFormattedPrice(null)).toEqual('');
    expect(getProductGallery(null)).toEqual([]);
    expect(getProductFiltered(null)).toEqual([null]);
    expect(getProductFiltered(null, null)).toEqual([null]);
    expect(getProductCategoryIds(null)).toEqual([]);
    expect(getProductAttributes(null)).toEqual({});
    expect(getProductMultiAttributeValue(null, 'productName')).toBe(null);
    expect(getProductMultiAttributeValue(product.advancedAttributes, null)).toBe(null);
  });

  describe('getProductMultiAttributeValue', () => {
    it('returns product multi attribute value from fieldSet', () => {
      expect(getProductMultiAttributeValue(product.advancedAttributes, 'productNameSlug')).toBe('product-name-1');
    });

    it('returns product multi attribute value from fieldSet', () => {
      expect(getProductMultiAttributeValue(product.advancedAttributes, 'productNameSlug', 'groupSet')).toBe('product-name');
    });
  });

  describe('getProductName', () => {
    it('returns name', () => {
      expect(getProductName(product)).toBe('Product Name 1');
    });

    it('return empty string instead of product name if not contains advanced attributes', () => {
      const productWithoutAdvAttr = {
        id: 1234
      } as any;
      expect(getProductName(productWithoutAdvAttr)).toEqual('');
    });
  });

  it('returns slug', () => {
    expect(getProductSlug(product)).toBe('1234');
  });

  it('returns description', () => {
    expect(getProductDescription(product)).toBe('Product 1 Description');
  });

  describe('getProductPrice', () => {
    it('returns price', () => {
      expect(getProductPrice(product)).toEqual({ regular: 114.5, special: 114 });
    });

    it('return null when min price is different than max', () => {
      const productWithSamePriceRange = {
        priceRange: { max: { withoutTax: 11450 }, min: {withoutTax: 11450}}
      } as any;
      expect(getProductPrice(productWithSamePriceRange)).toEqual({ regular: 114.5, special: null });
    });
  });

  it('return formatted price', () => {
    expect(getFormattedPrice(11450)).toEqual('11450€');
  });

  describe('getProductCoverImage', () => {
    it('returns product cover image', () => {
      expect(getProductCoverImage(product)).toEqual('ayc.com/images/99c1');
    });

    it('returns null when product not contains cover image hash', () => {
      const productWithoutCoverImg = {
        images: [
          {}
        ]
      } as any;
      expect(getProductCoverImage(productWithoutCoverImg)).toBe(null);
    });
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

  describe('getProductFiltered', () =>{
    it('returns filtered product as array', () => {
      expect(getProductFiltered(product)).toEqual([product]);
    });

    it('returns filtered products', () => {
      const products = [product, product];
      expect(getProductFiltered(products)).toEqual(products);
    });
  });

  describe('getProductAttributes', () => {
    describe('given products array', () => {
      it('returns all products attributes', () => {
        expect(getProductAttributes([product, product])).toEqual({
          color: [{ label: 'blue', value: 'blue' }],
          size: [{ label: 'xl', value: 'XL' }]
        });
      });

      it('returns filtered product attributes', () => {
        expect(getProductAttributes([product], ['color'])).toEqual({
          color: [{ label: 'blue', value: 'blue' }]
        });
        expect(getProductAttributes([product], ['foo'])).toEqual({});
      });
    });

    describe('given product', () => {
      it('returns all products attributes', () => {
        expect(getProductAttributes(product)).toEqual({
          color: 'blue',
          size: 'XL'
        });
      });

      it('returns filtered product attributes', () => {
        expect(getProductAttributes(product, ['color'])).toEqual({
          color: 'blue'
        });
        expect(getProductAttributes(product, ['foo'])).toEqual({});
      });
    });
  });

  it('getProductCategoryIds returns product categories', () => {
    expect(getProductCategoryIds(product)).toEqual([
      '344491',
      '344500'
    ]);
  });

  it('getProductCategoryIds returns product ID', () => {
    expect(getProductId(product)).toEqual('1234');
  });
});
