import { getThumbnailPath } from '@vue-storefront/core/helpers'
import config from 'config'

jest.clearAllMocks()
jest.mock('config', () => ({}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/core/modules/url/helpers', () => ({}))
jest.mock('@vue-storefront/core/lib/multistore', () => ({}))

describe('getThumbnailPath', () => {
  it('Get right value when useExactUrlsNoProxy is set', () => {
    config.images = {
      useExactUrlsNoProxy: true
    }
    expect(getThumbnailPath('testing')).toBe('testing')
  })

  it('Get right value when productPlaceholder is set', () => {
    config.images = {
      productPlaceholder: 'productPlaceholder'
    }
    expect(getThumbnailPath('no_selection')).toBe('productPlaceholder')
  })

  it('Get right value when useSpecificImagePaths is set', () => {
    config.images = {
      useSpecificImagePaths: true,
      paths: {
        product: '/catalog/product',
        test: '/test'
      }
    }
    expect(getThumbnailPath('/prod', 10, 10, 'test')).toBe('10/10/resize/test/prod')
    expect(getThumbnailPath('/prod', 10, 10)).toBe('10/10/resize/catalog/product/prod')
  })
  it('Get right value when useSpecificImagePaths and baseUrl are set', () => {
    config.images = {
      useSpecificImagePaths: true,
      baseUrl: 'test/',
      paths: {
        product: '/catalog/product',
        test: '/test'
      }
    }
    expect(getThumbnailPath('/prod', 10, 10, 'test')).toBe('test/10/10/resize/test/prod')
    expect(getThumbnailPath('/prod', 10, 10)).toBe('test/10/10/resize/catalog/product/prod')
  })

  it('Get right value when baseUrl is set', () => {
    config.images = {
      baseUrl: 'test/'
    }
    expect(getThumbnailPath('/test')).toBe('test/0/0/resize/test')
    expect(getThumbnailPath('/test', 10, 20)).toBe('test/10/20/resize/test')
    expect(getThumbnailPath('/test', 30, 20)).toBe('test/30/20/resize/test')
  })
})
