import config from 'config'
import { router } from '@vue-storefront/core/app';
import { RouteConfig } from 'vue-router'
import {
  setupMultistoreRoutes
} from '@vue-storefront/core/lib/multistore'

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

describe('setupMultistoreRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  })
  it('Add new routes for each store in mapStoreUrlsFor', () => {
    config.storeViews = {
      'de': {
        appendStoreCode: true
      },
      mapStoreUrlsFor: [
        'de'
      ],
      multistore: true
    }
    config.seo = {
      useUrlDispatcher: true
    }

    const routeConfig: RouteConfig[] = [
      {
        path: 'test'
      },
      {
        path: 'test2'
      }
    ]

    setupMultistoreRoutes(config, router, routeConfig)

    expect(router.addRoutes).toBeCalledTimes(1)
  })

  it('Do nothing as mapStoreUrlsFor is empty', () => {
    config.storeViews = {
      'de': {
      },
      mapStoreUrlsFor: []
    }

    const routeConfig: RouteConfig[] = [
      {
        path: 'test'
      },
      {
        path: 'test2'
      }
    ]

    setupMultistoreRoutes(config, router, routeConfig)

    expect(router.addRoutes).toBeCalledTimes(1)
  })
})
