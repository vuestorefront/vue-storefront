import { preProcessDynamicRoutes } from '@vue-storefront/core/modules/url/helpers';
import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import { RouterManager } from '../../../../../lib/router-manager';

jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(() => ({
    storeCode: '2',
    localizedRoute: jest.fn()
  }))
}));
jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}))
jest.mock('@vue-storefront/core/helpers/router', () => ({
  createRouter: jest.fn(),
  createRouterProxy: jest.fn()
}))
jest.mock('@vue-storefront/core/lib/router-manager', () => ({
  RouterManager: {
    findByName: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {
    }),
    debug: jest.fn(() => () => {
    }),
    warn: jest.fn(() => () => {
    }),
    error: jest.fn(() => () => {
    }),
    info: jest.fn(() => () => {
    })
  }
}));

let dispatcherMap: Record<string, any>;
let expectedPreparedRoutes: LocalizedRoute[];

describe('preProcessDynamicRoutes helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    dispatcherMap = {
      '/all-2': {
        name: 'category',
        params: {
          slug: 'all-2'
        }
      }
    }
    expectedPreparedRoutes = [
      {
        name: 'urldispatcher-/all-2',
        params: {
          slug: 'all-2'
        },
        path: '/all-2',
        pathToRegexpOptions: {
          strict: true
        }
      }
    ]
  })

  it('should return array with preparedRoutes', () => {
    (RouterManager.findByName as jest.Mock).mockImplementationOnce(() => ({
      name: 'category',
      path: '/all-2'
    }));

    const result = preProcessDynamicRoutes(dispatcherMap, true)

    expect(result).toEqual(expectedPreparedRoutes)
  })

  it('should return blank array with null if it does not find user route', () => {
    (RouterManager.findByName as jest.Mock).mockImplementationOnce(() => ({
      name: 'category', path: '/all-2'
    }));
    dispatcherMap = {
    }
    expectedPreparedRoutes = []

    const result = preProcessDynamicRoutes(dispatcherMap, true)

    expect(result).toEqual(expectedPreparedRoutes)
  })
})
