import { normalizeUrlPath } from '@vue-storefront/core/modules/url/helpers';

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
jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))

let expectedUrl: string;

describe('normalizeUrlPath helper', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    expectedUrl = '/gear/gear-3'
  })

  it('should return normalized url path', () => {
    const result = normalizeUrlPath('/gear/gear-3')

    expect(result).toEqual(expectedUrl)
  })
})
