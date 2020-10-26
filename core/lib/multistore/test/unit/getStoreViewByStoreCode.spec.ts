import getStoreViewByStoreCode from '@vue-storefront/core/lib/multistore/getStoreViewByStoreCode'
import config from 'config'

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

describe('getStoreViewByStoreCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  })
  it('returns storeView based on storeCode', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['test'],
      test: {
        storeCode: 'de'
      }
    }

    expect(getStoreViewByStoreCode('de')).toStrictEqual({
      storeCode: 'de'
    })
  })
  it('returns storeView based on storeCode even if there is missing storeView for first mapStoreUrlsFor', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['missing', 'test'],
      test: {
        storeCode: 'de'
      }
    }

    expect(getStoreViewByStoreCode('de')).toStrictEqual({
      storeCode: 'de'
    })
  })
})
