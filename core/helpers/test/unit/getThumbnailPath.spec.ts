import { slugify } from '@vue-storefront/core/helpers'
import config from 'config'

jest.clearAllMocks()
jest.mock('config', () => ({}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/core/modules/url/helpers', () => ({}))
jest.mock('@vue-storefront/core/lib/multistore', () => ({}))

describe('slugify', () => {
  it('Check if all strings are replaced to the right chars and that text is lowercase in the return', () => {
    expect(slugify('testing')).toBe('testing')
    expect(slugify('testing--')).toBe('testing-')
    expect(slugify('TESTING--&')).toBe('testing-and-')
    expect(slugify('TESTING--&    ')).toBe('testing-and-')
    expect(slugify('TES TING--&    ')).toBe('tes-ting-and-')
  })

  it('Check that an error is thrown when the parameter is not an string', () => {
    expect(() => slugify(12)).toThrow('string.replace is not a function')
  })
})
