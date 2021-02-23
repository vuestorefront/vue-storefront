import { capitalize } from '@vue-storefront/core/filters/capitalize'

describe('capitalize', () => {
  it('returns capitalized string', () => {
    expect(capitalize('capitalize')).toBe('Capitalize')
  });

  it('returns empty string if value is falsy ', () => {
    expect(capitalize(false)).toBe('')
  });
})
