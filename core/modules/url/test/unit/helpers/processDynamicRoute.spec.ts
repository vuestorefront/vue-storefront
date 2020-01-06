import { processDynamicRoute } from '@vue-storefront/core/modules/url/helpers';
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
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(() => ({
    storeCode: '2',
    localizedRoute: jest.fn()
  }))
}));
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

let expectedDynamicRoute;
let routeData: LocalizedRoute;

describe('parametrizeRouteData helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    routeData = {
      name: 'category',
      params: {
        slug: 'pants-18'
      }
    }
    expectedDynamicRoute = {
      name: 'urldispatcher-/men/bottoms-men/pants-men/pants-18',
      params: {
        slug: 'pants-18'
      },
      path: '/men/bottoms-men/pants-men/pants-18'
    }
  })

  it('should return parametrizedRoute from prepareDynamicRoute', () => {
    (RouterManager.findByName as jest.Mock).mockImplementationOnce(() => ({
      name: 'category',
      path: '/c/:slug'
    }));

    const result = processDynamicRoute(routeData, '/men/bottoms-men/pants-men/pants-18', false)

    expect(result).toEqual(expectedDynamicRoute)
  })

  it('should return null from prepareDynamicRoute if it does not find route', () => {
    routeData.name = 'test-test-test';
    routeData.params.slug = 'test-test-test';

    const result = processDynamicRoute(routeData, '', false)

    expect(result).toEqual(null)
  })
})
