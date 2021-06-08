import { removeStoreCodeFromRoute } from './../../'
import config from 'config'

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn()
}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('config', () => ({}))

describe('removeStoreCodeFromRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  })
  it('returns empty string for relative url "/us"', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us'
      }
    };

    expect(removeStoreCodeFromRoute('/us')).toBe('')
  })

  it('returns empty string for nested relative url "/us/us/us"', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us'
      }
    };

    expect(removeStoreCodeFromRoute('/us/us/us')).toBe('us/us')
  })

  it('returns same string for not match relative url', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us'
      }
    };

    expect(removeStoreCodeFromRoute('/us-us')).toBe('/us-us')
  })

  it('returns empty string for route object with url "us" without leading slash', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us'
      }
    };

    const route = { path: 'us' }

    expect(removeStoreCodeFromRoute(route)).toBe('')
  })

  it('removes storeCode from path with host', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        appendStoreCode: true,
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        appendStoreCode: true,
        storeCode: 'gb'
      }
    };

    const route = {
      host: 'domain.co.uk',
      path: 'gb/foo'
    }

    expect(removeStoreCodeFromRoute(route)).toBe('foo')
  })

  it('returns same string if route was not matched to any store', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us',
        url: 'us.domain.tld'
      }
    };

    expect(removeStoreCodeFromRoute('unknown-domain.tld')).toBe('unknown-domain.tld')
  })
})
