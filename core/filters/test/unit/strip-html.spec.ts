import { stripHTML } from '@vue-storefront/core/filters/strip-html';

describe('strip-html', () => {
  it('Check if string contains HTML tag', () => {
    expect(stripHTML('<b>Test</b>')).toBe('Test')
  })

  it('Check if string is empty', () => {
    expect(stripHTML()).toBe('')
  })
})
