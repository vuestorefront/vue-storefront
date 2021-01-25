import { htmlDecode } from '@vue-storefront/core/filters/html-decode'

describe('html-decode', () => {
  it('Check if string is decoded', () => {
    expect(htmlDecode('foo &copy;')).toBe('foo ©')
  })

  it('Check if string is empty', () => {
    expect(htmlDecode()).toBe('')
  })
})
