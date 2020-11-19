import { capitalize } from '@vue-storefront/core/filters'
import config from 'config'

jest.clearAllMocks()
jest.mock('config', () => ({}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/core/modules/url/helpers', () => ({}))
jest.mock('@vue-storefront/core/lib/multistore', () => ({}))

describe('capitalize', () => {
  it('Check if string is capitalized', () => {
    expect(capitalize('capitalize')).toBe('Capitalize')
    expect(capitalize('CAPITALIZE')).toBe('CAPITALIZE')
    expect(capitalize(['capitalize me'])).toBe('Capitalize me')
    expect(capitalize(undefined)).toBe('')
    expect(capitalize(123456)).toBe('123456')
  })
})
