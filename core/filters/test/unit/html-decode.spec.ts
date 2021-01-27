import { htmlDecode } from '@vue-storefront/core/filters/html-decode'

describe('html-decode', () => {
  it('decodes string', () => {
    expect(htmlDecode('foo &copy;')).toBe('foo ©')
  })

  it('returns empty string if value is falsy', () => {
    expect(htmlDecode(null)).toBe('')
  })
})
