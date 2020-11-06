import {
  localizedRouteConfig
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

describe('localizedRouteConfig', () => {
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

  it('use url value for localization', () => {
    config.storeViews.de.appendStoreCode = false
    config.storeViews.de.url = '/de_de'
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
      path: '/de_de/test',
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
