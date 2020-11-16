import removeLocalization from './../../removeLocalization'
import config from 'config'

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn()
}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('config', () => ({}))

describe('removeLocalization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  })
  it('returns empty string for relative url "/us"', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(removeLocalization('/us')).toBe('')
  })

  it('returns empty string for nested relative url "/us/us/us"', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(removeLocalization('/us/us/us')).toBe('/us/us')
  })

  it('returns same string for not match relative url', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(removeLocalization('/us-us')).toBe('/us-us')
  })

  it('returns empty string for route object with url "us" without leading slash', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    const route = { path: 'us' }

    expect(removeLocalization(route)).toBe('')
  })

  it('returns empty string for url that match domain', () => {
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

    expect(removeLocalization(route)).toBe('')
  })

  it('removes domain and prefix for url', () => {
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

    expect(removeLocalization(route)).toBe('/foo')
  })

  it('removes domain and prefix for route', () => {
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

    expect(removeLocalization(route)).toBe('/foo')
  })

  it('returns same string for not match path in route object', () => {
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

    const route = { path: 'gb/test' }

    expect(removeLocalization(route)).toBe('gb/test')
  })

  it('returns same string if route was not matched to any store', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        storeCode: 'us',
        url: 'us.domain.tld'
      }
    };

    expect(removeLocalization('unknown-domain.tld')).toBe('unknown-domain.tld')
  })

  it('appendStoreCode: returns empty string for relative url', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(removeLocalization('/us_navy')).toBe('')
  })

  it('appendStoreCode: returns empty string for nested relative url', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(removeLocalization('/us_navy/us/us')).toBe('/us/us')
  })

  it('appendStoreCode: returns same string for not match relative url', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us'],
      us: {
        appendStoreCode: true,
        storeCode: 'us_navy',
        url: '/us'
      }
    };

    expect(removeLocalization('/us_navy-us')).toBe('/us_navy-us')
  })

  it('appendStoreCode: returns empty string for route object with url "us" without leading slash', () => {
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

    expect(removeLocalization(route)).toBe('')
  })

  it('appendStoreCode: returns same string for not match path in route object', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['us', 'gb'],
      us: {
        storeCode: 'us',
        url: '/us'
      },
      gb: {
        appendStoreCode: true,
        storeCode: 'gb_gb',
        url: 'domain.co.uk'
      }
    };

    const route = { path: 'gb/test' }

    expect(removeLocalization(route)).toBe('gb/test')
  })

  it('appendStoreCode: returns empty string if route is not given', () => {
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
    expect(removeLocalization('')).toBe('')
  })

  it('appendStoreCode: returns empty string for route object', () => {
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

    expect(removeLocalization(route)).toBe('')
  })

  it('appendStoreCode: returns same string if path is not matching route', () => {
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

    expect(removeLocalization(route)).toBe('/')
  })

  it('real example 1', () => {
    config.defaultStoreCode = 'de'
    config.storeViews = {
      'multistore': true,
      'mapStoreUrlsFor': [
        'de',
        'it'
      ],
      'de': {
        'storeCode': 'de',
        'url': '/de'
      },
      'it': {
        'extend': 'de',
        'storeCode': 'it',
        'url': '/it'
      }
    }

    expect(removeLocalization('/de/teton-pullover-hoodie.html?childSku=MH02-XS-Black')).toBe('/teton-pullover-hoodie.html?childSku=MH02-XS-Black')
  })

  it('removes localization even if there is missing storeView for first mapStoreUrlsFor', () => {
    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['missing', 'test'],
      test: {
        storeCode: 'de',
        url: '/de'
      }
    }

    expect(removeLocalization('/de/teton-pullover-hoodie.html?childSku=MH02-XS-Black')).toBe('/teton-pullover-hoodie.html?childSku=MH02-XS-Black')
  })
})
