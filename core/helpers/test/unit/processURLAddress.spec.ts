import { processURLAddress } from '@vue-storefront/core/helpers'
import config from 'config'

jest.clearAllMocks()
jest.mock('config', () => ({}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/core/modules/url/helpers', () => ({}))
jest.mock('@vue-storefront/core/lib/multistore', () => ({}))

describe('processURLAddress', () => {
  it('Check that the url that comes back has the right value', () => {
    config.api = {
      url: 'api'
    }
    expect(processURLAddress('/testing')).toBe('api/testing')
    expect(processURLAddress('testing')).toBe('testing')
  })
})
