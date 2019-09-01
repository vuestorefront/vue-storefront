import {
  storeCodeFromRoute,
  prepareStoreView,
  adjustMultistoreApiUrl,
  localizedDispatcherRoute,
  LocalizedRoute,
  setupMultistoreRoutes
} from '@vue-storefront/core/lib/multistore'
import config from 'config'
import rootStore from '@vue-storefront/core/store';
import VueRouter, { RouteConfig } from 'vue-router'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'

jest.mock('@vue-storefront/core/app', () => ({ createApp: jest.fn() }))
jest.mock('../../../store', () => ({}))
jest.mock('@vue-storefront/i18n', () => ({loadLanguageAsync: jest.fn()}))
jest.mock('../../sync/task', () => ({initializeSyncTaskStorage: jest.fn()}))
jest.mock('@vue-storefront/core/hooks', () => ({ coreHooksExecutors: {
  beforeStoreViewChanged: jest.fn(args => args),
  afterStoreViewChanged: jest.fn(args => args)
}}))
jest.mock('@vue-storefront/core/lib/router-manager', () => ({
  RouterManager: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('config', () => ({}))

describe('Multistore', () => {
  let router
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
    it('returns default storeView given no storecode', () => {
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

      config.seo = {
        defaultTitle: 'Vue Storefront'
      }

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'US'
        },
        i18n: {
          defaultLocale: 'en-US',
          fullCountryName: 'United States',
          fullLanguageName: 'English'
        },
        seo: {
          defaultTitle: 'Vue Storefront'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog'
        },
        storeId: 1,
        storeCode: ''
      })
    })

    it('returns default storeView without setting defaultStoreCode when multistore mode is disabled', () => {
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

      config.seo = {
        defaultTitle: 'Vue Storefront'
      }

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'US'
        },
        i18n: {
          defaultLocale: 'en-US',
          fullCountryName: 'United States',
          fullLanguageName: 'English'
        },
        seo: {
          defaultTitle: 'Vue Storefront'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog'
        },
        storeId: 4,
        storeCode: ''
      })
    })

    it('returns default storeView with defaultStoreCode set when multistore mode is enabled', () => {
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

      config.seo = {
        defaultTitle: 'Vue Storefront'
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
        seo: {
          defaultTitle: 'Vue Storefront'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog'
        },
        storeId: 4,
        storeCode: 'de'
      })
    })

    it('returns storeView overwritting default store config values when multistore mode is enabled', () => {
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
          },
          seo: {
            defaultTitle: 'Vue Storefront'
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

      config.seo = {
        defaultTitle: 'Vue Storefront'
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
        seo: {
          defaultTitle: 'Vue Storefront'
        },
        elasticsearch: {
          index: 'vue_storefront_catalog_de'
        },
        storeId: 3,
        name: 'German Store',
        storeCode: 'de'
      })
    })

    it('returns storeView extending other storeView in multistore mode', () => {
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
          },
          seo: {
            defaultTitle: 'Vue Storefront'
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
          },
          seo: {
            defaultTitle: 'Vue Storefront'
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

      config.seo = {
        defaultTitle: 'Vue Storefront'
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
        seo: {
          defaultTitle: 'Vue Storefront'
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

  describe('adjustMultistoreApiUrl', () => {
    it('returns URL /test without storeCode as parameter', () => {
      rootStore.state.storeView = {
        storeCode: null
      }

      expect(adjustMultistoreApiUrl('/test')).toStrictEqual('/test')
    })

    it('returns URL /test with storeCode de as parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'de'
      }

      expect(adjustMultistoreApiUrl('/test')).toStrictEqual('/test?storeCode=de')
    })

    it('returns URL /test?a=b with storeCode de as parameter and current parameters from the URL', () => {
      rootStore.state.storeView = {
        storeCode: 'de'
      }

      expect(adjustMultistoreApiUrl('/test?a=b')).toStrictEqual('/test?a=b&storeCode=de')
    })

    it('returns URL /test?a=b&storeCode=de with added storeCode at as parameter and removes previous storeCode parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'at'
      }

      expect(adjustMultistoreApiUrl('/test?a=b&storeCode=de')).toStrictEqual('/test?a=b&storeCode=at')
    })

    it('returns URL /test?storeCode=de with changed storeCode at as parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'at'
      }

      expect(adjustMultistoreApiUrl('/test?storeCode=de')).toStrictEqual('/test?storeCode=at')
    })

    it('returns URL /test?storeCode=de with changed storeCode at as parameter', () => {
      rootStore.state.storeView = {
        storeCode: 'at'
      }

      expect(adjustMultistoreApiUrl('/test?storeCode=de&storeCode=de')).toStrictEqual('/test?storeCode=at')
    })
  })

  describe('localizedDispatcherRoute', () => {
    it('URL /test stays the same', () => {
      config.storeViews = {}

      expect(localizedDispatcherRoute('/test', 'de')).toStrictEqual('/test')
    })

    it('URL /test starts with /de', () => {
      config.storeViews = {
        de: {
          appendStoreCode: true
        }
      }

      expect(localizedDispatcherRoute('/test', 'de')).toStrictEqual('/de/test')
    })

    it('URL /test?a=b&b=a stays the same', () => {
      config.storeViews = {}

      expect(localizedDispatcherRoute('/test?a=b&b=a', 'de')).toStrictEqual('/test?a=b&b=a')
    })

    it('URL /test?a=b&b=a starts with /de', () => {
      config.storeViews = {
        de: {
          appendStoreCode: true
        }
      }

      expect(localizedDispatcherRoute('/test?a=b&b=a', 'de')).toStrictEqual('/de/test?a=b&b=a')
    })

    it('URL with  LocalizedRoute object with fullPath test gets prefixed with /de', () => {
      config.storeViews = {}

      const LocalizedRoute: LocalizedRoute = {
        fullPath: 'test'
      }

      expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/test')
    })

    it('URL with LocalizedRoute object with fullPath and parameter test stays the same', () => {
      config.storeViews = {}

      const LocalizedRoute: LocalizedRoute = {
        fullPath: 'test',
        params: {
          a: 'b',
          b: 'a'
        }
      }

      expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/test?a=b&b=a')
    })

    it('URL with LocalizedRoute object with fullPath test gets prefixed with /de', () => {
      config.storeViews = {
        de: {
          appendStoreCode: true
        }
      }

      const LocalizedRoute: LocalizedRoute = {
        fullPath: 'test'
      }

      expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/de/test')
    })

    it('URL with LocalizedRoute object with fullPath test and params gets prefixed with /de', () => {
      config.storeViews = {
        de: {
          appendStoreCode: true
        }
      }

      const LocalizedRoute: LocalizedRoute = {
        fullPath: 'test',
        params: {
          a: 'b',
          b: 'a'
        }
      }

      expect(localizedDispatcherRoute(LocalizedRoute, 'de')).toStrictEqual('/de/test?a=b&b=a')
    })
  })

  describe('setupMultistoreRoutes', () => {
    it('Add new routes for each store in mapStoreUrlsFor', () => {
      config.storeViews = {
        'de': {
          appendStoreCode: true
        },
        mapStoreUrlsFor: [
          'de'
        ],
        multistore: true
      }

      const routeConfig: RouteConfig[] = [
        {
          path: 'test'
        },
        {
          path: 'test2'
        }
      ]

      const vueRouter = {}

      setupMultistoreRoutes(config, (vueRouter as VueRouter), routeConfig)

      expect(RouterManager.addRoutes).toBeCalledTimes(1)
    })

    it('Do nothing as mapStoreUrlsFor is empty', () => {
      config.storeViews = {
        'de': {
        },
        mapStoreUrlsFor: []
      }

      const routeConfig: RouteConfig[] = [
        {
          path: 'test'
        },
        {
          path: 'test2'
        }
      ]

      const vueRouter = {}

      setupMultistoreRoutes(config, (vueRouter as VueRouter), routeConfig)

      expect(RouterManager.addRoutes).toBeCalledTimes(0)
    })
  })
})
