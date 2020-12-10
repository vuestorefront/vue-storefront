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
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  })
  it('returns store code given url matching a storeview by path', () => {
    config.storeViews = {
      multistore: true,
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
      multistore: true,
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
      multistore: true,
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
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
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
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
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
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        storeCode: 'gb',
        url: 'domain.co.uk'
      }
    };

    const route = { path: 'gb' }

    expect(storeCodeFromRoute(route)).toBe('')
  })

  it('returns empty string if route was not matched to any store', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us',
        url: 'us.domain.tld'
      }
    };

    expect(storeCodeFromRoute('unknown-domain.tld')).toBe('')
  })

  it('returns empty string if route is not given', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        storeCode: 'gb',
        url: 'domain.co.uk/gb'
      }
    };

    expect(storeCodeFromRoute('')).toBe('')
  })

  it('returns empty string if multistore is off', () => {
    config.storeViews = {
      multistore: false,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
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

    expect(storeCodeFromRoute(route)).toBe('')
  })

  it('supports extend option', () => {
    config.storeViews = {
      multistore: true,
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

  it('returns empty string if storeCode doesn\'t exist', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        url: 'domain.co.uk/gb'
      }
    };

    const route = 'domain.co.uk/gb/foo'

    expect(storeCodeFromRoute(route)).toBe('')
  })

  it('appendStoreCode: returns storeCode if route doesn\'t have slash', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        appendStoreCode: true,
        storeCode: 'gb',
        url: 'domain.co.uk'
      }
    };

    const route = { path: 'gb' }

    expect(storeCodeFromRoute(route)).toBe('gb')
  })

  it('appendStoreCode: returns storeCode if route does have slash', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        appendStoreCode: true,
        storeCode: 'gb',
        url: 'domain.co.uk'
      }
    };

    const route = { path: '/gb' }

    expect(storeCodeFromRoute(route)).toBe('gb')
  })

  it('returns empty string if path is not matching route with appendStoreCode', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        appendStoreCode: true,
        storeCode: 'gb',
        url: 'domain.co.uk'
      }
    };

    const route = { path: '/' }

    expect(storeCodeFromRoute(route)).toBe('')
  })

  it('appendStoreCode: returns empty string if path is not matching route with appendStoreCode', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        appendStoreCode: true,
        storeCode: 'gb',
        url: 'domain.co.uk'
      }
    };

    const route = { path: 'domain.co.uk' }

    expect(storeCodeFromRoute(route)).toBe('')
  })

  it('appendStoreCode: real example', () => {
    config.storeViews = {
      multistore: true, // enable multistore
      mapStoreUrlsFor: [
        'de',
        'it'
      ],
      de: {
        storeCode: 'de',
        appendStoreCode: true
      }
    }

    const route = {
      host: 'localhost:3000',
      path: 'de'
    }

    expect(storeCodeFromRoute(route)).toBe('de')
  })

  it('returns storeCode even if there is missing storeView for first mapStoreUrlsFor', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['missing', 'test'],
      test: {
        storeCode: 'de',
        url: '/de'
      }
    }

    expect(storeCodeFromRoute('/de/teton-pullover-hoodie.html?childSku=MH02-XS-Black')).toBe('de')
  })
})
