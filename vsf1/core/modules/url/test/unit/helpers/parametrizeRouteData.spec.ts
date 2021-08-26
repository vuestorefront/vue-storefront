import { parametrizeRouteData } from '@vue-storefront/core/modules/url/helpers';
import { LocalizedRoute } from '@vue-storefront/core/lib/types'

jest.mock('@vue-storefront/core/app', () => jest.fn());
jest.mock('@vue-storefront/core/lib/router-manager', () => jest.fn());
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(),
  localizedDispatcherRoute: jest.fn(),
  localizedRoute: jest.fn()
}));
jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))

let expectedParametrizedRoute;
let routeData: LocalizedRoute;
let query;

describe('parametrizeRouteData helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    query = {
      slug: 'pants-18'
    }
    routeData = {
      name: 'category',
      params: {
        slug: 'pants-18'
      }
    }
    expectedParametrizedRoute = {
      name: 'category',
      params: {
        slug: 'pants-18'
      }
    }
  })

  it('should return parametrizedRoute', () => {
    const result = parametrizeRouteData(routeData, query, '')
    expect(result).toEqual(expectedParametrizedRoute)
  })
})
