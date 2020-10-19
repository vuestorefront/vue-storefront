import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import {
  adjustMultistoreApiUrl,
  localizedDispatcherRoute,
  setupMultistoreRoutes,
  localizedRoutePath,
  localizedRouteConfig
} from '@vue-storefront/core/lib/multistore'
import config from 'config'
import rootStore from '@vue-storefront/core/store';
import { router } from '@vue-storefront/core/app';
import { RouteConfig } from 'vue-router'

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('@vue-storefront/core/lib/sync/task', () => ({ initializeSyncTaskStorage: jest.fn() }))
jest.mock('@vue-storefront/core/hooks', () => ({ coreHooksExecutors: {
  beforeStoreViewChanged: jest.fn(args => args),
  afterStoreViewChanged: jest.fn(args => args)
} }))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('config', () => ({}))

describe('Multistore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (rootStore as any).state = {};
    Object.keys(config).forEach((key) => { delete config[key]; });
    rootStore.state.storeView = {
      appendStoreCode: true
    }
  })

  describe('adjustMultistoreApiUrl', () => {
    it('returns URL /test without storeCode as parameter', () => {
      rootStore.state.storeView = {
        storeCode: null
      }

      expect(adjustMultistoreApiUrl('/test')).toStrictEqual('/test')
    })

    it('returns URL /test with storeCode de as parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'de'
      }

      expect(adjustMultistoreApiUrl('/test')).toStrictEqual('/test?storeCode=de')
    })

    it('returns URL /test?a=b with storeCode de as parameter and current parameters from the URL', () => {
      rootStore.state.storeView = {
        storeCode: 'de'
      }

      expect(adjustMultistoreApiUrl('/test?a=b')).toStrictEqual('/test?a=b&storeCode=de')
    })

    it('returns URL /test?a=b&storeCode=de with added storeCode at as parameter and removes previous storeCode parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'at'
      }

      expect(adjustMultistoreApiUrl('/test?a=b&storeCode=de')).toStrictEqual('/test?a=b&storeCode=at')
    })

    it('returns URL /test?storeCode=de with changed storeCode at as parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'at'
      }

      expect(adjustMultistoreApiUrl('/test?storeCode=de')).toStrictEqual('/test?storeCode=at')
    })

    it('returns URL /test?storeCode=de with changed storeCode at as parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'at'
      }

      expect(adjustMultistoreApiUrl('/test?storeCode=de&storeCode=de')).toStrictEqual('/test?storeCode=at')
    })
  })

  describe('localizedDispatcherRoute', () => {
    it('URL /test stays the same', () => {
      config.storeViews = {}

      expect(localizedDispatcherRoute('/test', 'de')).toStrictEqual('/test')
    })

    it('URL /test starts with /de', () => {
      config.storeViews = {
        de: {
          appendStoreCode: true
        }
      }

      expect(localizedDispatcherRoute('/test', 'de')).toStrictEqual('/de/test')
    })

    it('URL /test?a=b&b=a stays the same', () => {
      config.storeViews = {}

      expect(localizedDispatcherRoute('/test?a=b&b=a', 'de')).toStrictEqual('/test?a=b&b=a')
    })

    it('URL /test?a=b&b=a starts with /de', () => {
      config.storeViews = {
        de: {
          appendStoreCode: true
        }
      }

      expect(localizedDispatcherRoute('/test?a=b&b=a', 'de')).toStrictEqual('/de/test?a=b&b=a')
    })

    it('URL with  LocalizedRoute object with fullPath test gets prefixed with /de', () => {
      config.storeViews = {}

      const LocalizedRoute: LocalizedRoute = {
        fullPath: 'test'
      }

      expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/test')
    })

    it('URL with LocalizedRoute object with fullPath and parameter test stays the same', () => {
      config.storeViews = {}

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
        de: {
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
        de: {
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
  })

  describe('setupMultistoreRoutes', () => {
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

  describe('localizedRoutePath', () => {
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
  })

  describe('localizedRouteConfig', () => {
    it('create new route object with storeCode', () => {
      const storeCode = 'de'
      const route = {
        path: '/test',
        name: 'test'
      }
      const expectedRoute = {
        path: '/de/test',
        name: 'de-test'
      }

      expect(localizedRouteConfig(route, storeCode)).toEqual(expectedRoute)
    })

    it('change only route name for child route', () => {
      const storeCode = 'de'
      const childRoute = {
        path: '/test2',
        name: 'test2'
      }
      const expectedRoute = {
        path: '/test2',
        name: 'de-test2'
      }

      expect(localizedRouteConfig(childRoute, storeCode, true)).toEqual(expectedRoute)
    })

    it('add localization for nested routes', () => {
      const storeCode = 'de'
      const route = {
        path: '/test',
        name: 'test',
        children: [
          {
            path: 'test2',
            name: 'test2',
            children: [
              {
                path: '/test3',
                name: 'test3'
              }
            ]
          }
        ]
      }
      const expectedRoute = {
        path: '/de/test',
        name: 'de-test',
        children: [
          {
            path: 'test2',
            name: 'de-test2',
            children: [
              {
                path: '/test3',
                name: 'de-test3'
              }
            ]
          }
        ]
      }

      expect(localizedRouteConfig(route, storeCode)).toEqual(expectedRoute)
    })
  })
})
