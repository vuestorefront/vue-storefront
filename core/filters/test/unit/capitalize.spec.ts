import { capitalize } from '@vue-storefront/core/filters/capitalize'

describe('capitalize', () => {
  it('Check if string is capitalized', () => {
    expect(capitalize('capitalize')).toBe('Capitalize')
  });

  it('Check if string is empty', () => {
    expect(capitalize()).toBe('')
  });
})
