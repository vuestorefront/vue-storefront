import {
  localizedDispatcherRoute
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

describe('localizedDispatcherRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  })

  it('URL with  LocalizedRoute object with fullPath test stays the same', () => {
    config.storeViews = {
      multistore: true
    }

    const LocalizedRoute: LocalizedRoute = {
      fullPath: 'test'
    }

    expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/test')
  })

  it('URL with LocalizedRoute object with fullPath and parameter test stays the same', () => {
    config.storeViews = {
      multistore: true
    }

    const LocalizedRoute: LocalizedRoute = {
      fullPath: 'test',
      params: {
        a: 'b',
        b: 'a'
      }
    }

    expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/test?a=b&b=a')
  })

  it('URL with LocalizedRoute object with fullPath test gets prefixed with /de', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['de'],
      de: {
        storeCode: 'de',
        appendStoreCode: true
      }
    }

    const LocalizedRoute: LocalizedRoute = {
      fullPath: 'test'
    }

    expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/de/test')
  })

  it('URL with LocalizedRoute object with fullPath test and params gets prefixed with /de', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['de'],
      de: {
        storeCode: 'de',
        appendStoreCode: true
      }
    }

    const LocalizedRoute: LocalizedRoute = {
      fullPath: 'test',
      params: {
        a: 'b',
        b: 'a'
      }
    }

    expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/de/test?a=b&b=a')
  })

  it('URL with LocalizedRoute object with fullPath test stays same', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['de'],
      de: {
        storeCode: 'de',
        appendStoreCode: false
      }
    }

    const LocalizedRoute: LocalizedRoute = {
      fullPath: 'test'
    }

    expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/test')
  })

  it('URL with LocalizedRoute object with fullPath test and params stays same', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['de'],
      de: {
        storeCode: 'de',
        appendStoreCode: false
      }
    }

    const LocalizedRoute: LocalizedRoute = {
      fullPath: 'test',
      params: {
        a: 'b',
        b: 'a'
      }
    }

    expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/test?a=b&b=a')
  })
})
