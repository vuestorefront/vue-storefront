import {
  localizedRoutePath
} from '@vue-storefront/core/lib/multistore'
import config from 'config'

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('config', () => ({}))

describe('localizedRoutePath', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['de'],
      de: {
        storeCode: 'de',
        appendStoreCode: true
      }
    }
  })
  it('add storeCode to route path with slash', () => {
    const storeCode = 'de'
    const path = '/test'

    expect(localizedRoutePath(path, storeCode)).toBe('/de/test')
  })

  it('add storeCode to route path without slash', () => {
    const storeCode = 'de'
    const path = 'test'

    expect(localizedRoutePath(path, storeCode)).toBe('/de/test')
  })

  it('add storeCode to route path with hash', () => {
    const storeCode = 'de'
    const path = '/test#test'

    expect(localizedRoutePath(path, storeCode)).toBe('/de/test#test')
  })

  it('use url value for localization', () => {
    config.storeViews.de.appendStoreCode = false
    config.storeViews.de.url = '/test'
    const storeCode = 'de'
    const path = '/test'

    expect(localizedRoutePath(path, storeCode)).toBe('/test/test')
  })
})
