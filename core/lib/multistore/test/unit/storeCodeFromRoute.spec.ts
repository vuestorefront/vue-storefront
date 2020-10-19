import storeCodeFromRoute from './../../storeCodeFromRoute'
import config from 'config'

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn()
}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('config', () => ({}))

describe('storeCodeFromRoute', () => {
  it('returns store code given url matching a storeview by path', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(storeCodeFromRoute('/us')).toBe('us_navy')
  })

  it('returns store code given a route matching a storeview by path', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    const route = { path: 'us' }

    expect(storeCodeFromRoute(route)).toBe('us_navy')
  })

  it('returns store code given a url matching a storeview by url', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us_navy',
        url: '/us'
      },
      gb: {
        storeCode: 'gb_queen',
        url: 'domain.co.uk'
      }
    };

    const route = 'domain.co.uk'

    expect(storeCodeFromRoute(route)).toBe('gb_queen')
  })

  it('returns store code given a url matching a storeview by url with path', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        url: '/us'
      },
      gb: {
        storeCode: 'gb',
        url: 'domain.co.uk/gb'
      }
    };

    const route = 'domain.co.uk/gb/foo'

    expect(storeCodeFromRoute(route)).toBe('gb')
  })

  it('returns store code given a route matching a storeview by url with path', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        url: '/us'
      },
      gb: {
        storeCode: 'gb',
        url: 'domain.co.uk/gb'
      }
    };

    const route = {
      host: 'domain.co.uk',
      path: 'gb/foo'
    }

    expect(storeCodeFromRoute(route)).toBe('gb')
  })

  it('returns empty string if given a route which doesn\'t have url and is not matched by path', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        url: '/us'
      },
      gb: {
        url: 'domain.co.uk'
      }
    };

    const route = { path: 'gb' }

    expect(storeCodeFromRoute(route)).toBe('')
  })

  it('returns empty string if route was not matched to any store', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us'],
      us: {
        url: 'us.domain.tld'
      }
    };

    expect(storeCodeFromRoute('unknown-domain.tld')).toBe('')
  })

  it('returns empty string if route is not given', () => {
    expect(storeCodeFromRoute('')).toBe('')
  })

  it('supports extend option', () => {
    config.storeViews = {
      mapStoreUrlsFor: ['us'],
      us: {
        url: '/us_navy',
        extend: 'full_us'
      },
      full_us: {
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(storeCodeFromRoute('/us_navy')).toBe('us_navy')
  })
})
