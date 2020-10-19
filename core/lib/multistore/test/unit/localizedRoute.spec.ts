import {
  localizedRoute
} from '@vue-storefront/core/lib/multistore'
import config from 'config'
import { LocalizedRoute } from '@vue-storefront/core/lib/types'

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('config', () => ({}))

describe('localizedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  })
  it('URL /test stays the same', () => {
    config.storeViews = {}

    expect(localizedRoute('/test', 'de')).toStrictEqual('/test')
  })

  it('URL /test starts with /de if appendStoreCode is true', () => {
    config.storeViews = {
      de: {
        appendStoreCode: true
      }
    }

    expect(localizedRoute('/test', 'de')).toStrictEqual('/de/test')
  })

  it('URL /test stays the same if appendStoreCode is false', () => {
    config.storeViews = {
      de: {
        appendStoreCode: false
      }
    }

    expect(localizedRoute('/test', 'de')).toStrictEqual('/test')
  })

  it('URL /test?a=b&b=a stays the same', () => {
    config.storeViews = {}

    expect(localizedRoute('/test?a=b&b=a', 'de')).toStrictEqual('/test?a=b&b=a')
  })

  it('URL /test?a=b&b=a starts with /de', () => {
    config.storeViews = {
      de: {
        appendStoreCode: true
      }
    }

    expect(localizedRoute('/test?a=b&b=a', 'de')).toStrictEqual('/de/test?a=b&b=a')
  })

  it('URL /test?a=b&b=a stays the same if appendStoreCode is false', () => {
    config.storeViews = {
      de: {
        appendStoreCode: false
      }
    }

    expect(localizedRoute('/test?a=b&b=a', 'de')).toStrictEqual('/test?a=b&b=a')
  })
})
