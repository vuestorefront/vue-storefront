import { formatProductMessages } from '@vue-storefront/core/filters/product-messages'

describe('product-messages', () => {
  it('returns concatenated messages', () => {
    const mockMessages = {
      a: 'abc',
      b: 'def',
      c: 0
    }

    expect(formatProductMessages(mockMessages)).toBe('abc, def')
  })
})
