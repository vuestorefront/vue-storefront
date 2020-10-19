import {
  localizedRoutePath,
  localizedRouteConfig
} from '@vue-storefront/core/lib/multistore'
import config from 'config'
import rootStore from '@vue-storefront/core/store';

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
