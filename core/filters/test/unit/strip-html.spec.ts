import { stripHTML } from '@vue-storefront/core/filters/strip-html';

describe('strip-html', () => {
  it('returns provided string without html tag', () => {
    expect(stripHTML('<b>Test</b>')).toBe('Test')
  })

  it('returns empty string if provided value is falsy', () => {
    expect(stripHTML(null)).toBe('')
  })
})
