import { storeCodeFromRoute, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'
import rootStore from '@vue-storefront/core/store';

jest.mock('@vue-storefront/core/app', () => ({ createApp: jest.fn() }))
jest.mock('../../../store', () => ({}))
jest.mock('@vue-storefront/i18n', () => ({loadLanguageAsync: jest.fn()}))
jest.mock('../../sync/task', () => ({initializeSyncTaskStorage: jest.fn()}))
jest.mock('@vue-storefront/core/hooks', () => ({ coreHooksExecutors: {
  beforeStoreViewChange: jest.fn(args => args),
  afterStoreViewChange: jest.fn(args => args)
}}))
jest.mock('query-string', () => jest.fn())
jest.mock('@vue-storefront/core/lib/router-manager', () => ({
  RouterManager: {}
}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('config', () => ({}))

describe('Multistore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (rootStore as any).state = {};
    Object.keys(config).forEach((key) => { delete config[key]; });
  })

  describe('storeCodeFromRoute', () => {
    it('returns store code given url matching a storeview by path', () => {
      config.storeViews = {
        mapStoreUrlsFor: ['us'],
        us: {
          url: '/us'
        }
      };

      expect(storeCodeFromRoute('/us')).toBe('us')
    })

    it('returns store code given a route matching a storeview by path', () => {
      config.storeViews = {
        mapStoreUrlsFor: ['us'],
        us: {
          url: '/us'
        }
      };

      const route = { path: 'us' }

      expect(storeCodeFromRoute(route)).toBe('us')
    })

    it('returns store code given a url matching a storeview by url', () => {
      config.storeViews = {
        mapStoreUrlsFor: ['us', 'gb'],
        us: {
          url: '/us'
        },
        gb: {
          url: 'domain.co.uk'
        }
      };

      const route = 'domain.co.uk'

      expect(storeCodeFromRoute(route)).toBe('gb')
    })

    it('returns store code given a url matching a storeview by url with path', () => {
      config.storeViews = {
        mapStoreUrlsFor: ['us', 'gb'],
        us: {
          url: '/us'
        },
        gb: {
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
  })

  describe('prepareStoreView', () => {
    it('return default storeView', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        multistore: false
      }

      config.tax = {
        defaultCountry: 'US'
      }

      config.i18n = {
        defaultLocale: 'en-US',
        fullCountryName: 'United States',
        fullLanguageName: 'English'
      }

      config.elasticsearch = {
        index: 'vue_storefront_catalog'
      }
      config.defaultStoreCode = ''

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'US'
        },
        i18n: {
          defaultLocale: 'en-US',
          fullCountryName: 'United States',
          fullLanguageName: 'English'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog'
        },
        storeId: 1,
        storeCode: ''
      })
    })

    it('return default storeView with defaultStoreCode set to  de and multistore set to false', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        multistore: false,
        de: {
          storeId: 4
        }
      }

      config.tax = {
        defaultCountry: 'US'
      }

      config.i18n = {
        defaultLocale: 'en-US',
        fullCountryName: 'United States',
        fullLanguageName: 'English'
      }

      config.elasticsearch = {
        index: 'vue_storefront_catalog'
      }
      config.defaultStoreCode = 'de'

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'US'
        },
        i18n: {
          defaultLocale: 'en-US',
          fullCountryName: 'United States',
          fullLanguageName: 'English'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog'
        },
        storeId: 4,
        storeCode: ''
      })
    })

    it('return default storeView with defaultStoreCode set to  de', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        multistore: true,
        de: {
          storeId: 4
        }
      }

      config.tax = {
        defaultCountry: 'US'
      }

      config.i18n = {
        defaultLocale: 'en-US',
        fullCountryName: 'United States',
        fullLanguageName: 'English'
      }

      config.elasticsearch = {
        index: 'vue_storefront_catalog'
      }
      config.defaultStoreCode = 'de'

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'US'
        },
        i18n: {
          defaultLocale: 'en-US',
          fullCountryName: 'United States',
          fullLanguageName: 'English'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog'
        },
        storeId: 4,
        storeCode: 'de'
      })
    })

    it('return de storeView with merged store config values', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        multistore: true,
        de: {
          storeCode: 'de',
          storeId: 3,
          name: 'German Store',
          elasticsearch: {
            index: 'vue_storefront_catalog_de'
          },
          tax: {
            defaultCountry: 'DE'
          },
          i18n: {
            fullCountryName: 'Germany',
            fullLanguageName: 'German',
            defaultLocale: 'de-DE'
          }
        }
      }

      config.tax = {
        defaultCountry: 'US'
      }

      config.i18n = {
        defaultLocale: 'en-US',
        fullCountryName: 'United States',
        fullLanguageName: 'English'
      }

      config.elasticsearch = {
        index: 'vue_storefront_catalog'
      }
      config.defaultStoreCode = 'de'

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'DE'
        },
        i18n: {
          fullCountryName: 'Germany',
          fullLanguageName: 'German',
          defaultLocale: 'de-DE'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog_de'
        },
        storeId: 3,
        name: 'German Store',
        storeCode: 'de'
      })
    })

    it('return it storeView with merged store config values', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        multistore: true,
        de: {
          storeCode: 'de',
          storeId: 3,
          name: 'German Store',
          elasticsearch: {
            index: 'vue_storefront_catalog_de'
          },
          tax: {
            defaultCountry: 'DE'
          },
          i18n: {
            fullCountryName: 'Germany',
            fullLanguageName: 'German',
            defaultLocale: 'de-DE'
          }
        },
        it: {
          extend: 'de',
          storeCode: 'it',
          storeId: 4,
          name: 'Italian Store',
          elasticsearch: {
            index: 'vue_storefront_catalog_it'
          },
          tax: {
            defaultCountry: 'IT'
          },
          i18n: {
            fullCountryName: 'Italy',
            fullLanguageName: 'Italian',
            defaultLocale: 'it-IT'
          }
        }
      }

      config.tax = {
        defaultCountry: 'US'
      }

      config.i18n = {
        defaultLocale: 'en-US',
        fullCountryName: 'United States',
        fullLanguageName: 'English'
      }

      config.elasticsearch = {
        index: 'vue_storefront_catalog'
      }
      config.defaultStoreCode = 'it'

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'IT'
        },
        i18n: {
          fullCountryName: 'Italy',
          fullLanguageName: 'Italian',
          defaultLocale: 'it-IT'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog_it'
        },
        storeId: 4,
        extend: 'de',
        name: 'Italian Store',
        storeCode: 'it'
      })
    })
  })
})
