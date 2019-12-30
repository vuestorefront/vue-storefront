import {
  getProductName,
  getProductSlug,
  getProductPrice,
  getProductGallery,
} from './../src/index'

const product = {
  _name: 'variant 1',
  _slug: 'variant-1',
  price: {
    value: { centAmount: 12 }
  },
  images: [{ url: 'imageV11/url.jpg' }, { url: 'imageV12/url.jpg' }],
} as any

describe('[commercetools-api-client] product helpers', () => {
  it('returns name', () => {
    expect(getProductName(product)).toBe('variant 1')
  })

  it('returns slug', () => {
    expect(getProductSlug(product)).toBe('variant-1')
  })

  it('returns price', () => {
    expect(getProductPrice(product)).toBe(12)
  })

  it('returns gallery', () => {
    expect(getProductGallery(product)).toEqual([
      { small: 'imageV11/url.jpg', big: 'imageV11/url.jpg', normal: 'imageV11/url.jpg' },
      { small: 'imageV12/url.jpg', big: 'imageV12/url.jpg', normal: 'imageV12/url.jpg' },
    ])
  })
})
