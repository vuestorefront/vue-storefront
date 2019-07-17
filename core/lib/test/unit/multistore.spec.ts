import { storeCodeFromRoute, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'
import rootStore from '@vue-storefront/core/store';

jest.mock('@vue-storefront/core/app', () => ({ createApp: jest.fn() }))
jest.mock('../../../store', () => ({}))
jest.mock('@vue-storefront/i18n', () => ({loadLanguageAsync: jest.fn()}))
jest.mock('../../sync/task', () => ({initializeSyncTaskStorage: jest.fn()}))
jest.mock('@vue-storefront/core/hooks', () => ({ coreHooksExecutors: {
  beforeStoreViewChange: jest.fn(),
  afterStoreViewChange: jest.fn()
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

      config.tax = {
        defaultCountry: 'US',
        defaultRegion: '',
        sourcePriceIncludesTax: false,
        calculateServerSide: true
      }

      config.i18n = {
        defaultCountry: 'US',
        defaultLanguage: 'EN',
        availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
        defaultLocale: 'en-US',
        currencyCode: 'USD',
        currencySign: '$',
        currencySignPlacement: 'preppend',
        dateFormat: 'HH:mm D/M/YYYY',
        fullCountryName: 'United States',
        fullLanguageName: 'English',
        bundleAllStoreviewLanguages: true
      }

      config.elasticsearch = {
        httpAuth: '',
        host: '/api/catalog',
        index: 'vue_storefront_catalog',
        min_score: 0.02,
        csrTimeout: 5000,
        ssrTimeout: 1000,
        queryMethod: 'GET',
        disablePersistentQueriesCache: true,
        searchScoring: {
          attributes: {
            attribute_code: {
              scoreValues: { attribute_value: { weight: 1 } }
            }
          },
          fuzziness: 2,
          cutoff_frequency: 0.01,
          max_expansions: 3,
          minimum_should_match: '75%',
          prefix_length: 2,
          boost_mode: 'multiply',
          score_mode: 'multiply',
          max_boost: 100,
          function_min_score: 1
        },
        searchableAttributes: {
          name: {
            boost: 4
          },
          sku: {
            boost: 2
          },
          'category.name': {
            boost: 1
          }
        }
      }
      config.defaultStoreCode = ''

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'US',
          defaultRegion: '',
          sourcePriceIncludesTax: false,
          calculateServerSide: true
        },
        i18n: {
          defaultCountry: 'US',
          defaultLanguage: 'EN',
          availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
          defaultLocale: 'en-US',
          currencyCode: 'USD',
          currencySign: '$',
          currencySignPlacement: 'preppend',
          dateFormat: 'HH:mm D/M/YYYY',
          fullCountryName: 'United States',
          fullLanguageName: 'English',
          bundleAllStoreviewLanguages: true
        },
        elasticsearch: {
          httpAuth: '',
          host: '/api/catalog',
          index: 'vue_storefront_catalog',
          min_score: 0.02,
          csrTimeout: 5000,
          ssrTimeout: 1000,
          queryMethod: 'GET',
          disablePersistentQueriesCache: true,
          searchScoring: {
            attributes: {
              attribute_code: {
                scoreValues: { attribute_value: { weight: 1 } }
              }
            },
            fuzziness: 2,
            cutoff_frequency: 0.01,
            max_expansions: 3,
            minimum_should_match: '75%',
            prefix_length: 2,
            boost_mode: 'multiply',
            score_mode: 'multiply',
            max_boost: 100,
            function_min_score: 1
          },
          searchableAttributes: {
            name: {
              boost: 4
            },
            sku: {
              boost: 2
            },
            'category.name': {
              boost: 1
            }
          }
        },
        storeId: 1,
        storeCode: ''
      })
    })

    it('return default storeView with Store Code de', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        de: {
          storeId: 1
        }
      }

      config.tax = {
        defaultCountry: 'US',
        defaultRegion: '',
        sourcePriceIncludesTax: false,
        calculateServerSide: true
      }

      config.i18n = {
        defaultCountry: 'US',
        defaultLanguage: 'EN',
        availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
        defaultLocale: 'en-US',
        currencyCode: 'USD',
        currencySign: '$',
        currencySignPlacement: 'preppend',
        dateFormat: 'HH:mm D/M/YYYY',
        fullCountryName: 'United States',
        fullLanguageName: 'English',
        bundleAllStoreviewLanguages: true
      }

      config.elasticsearch = {
        httpAuth: '',
        host: '/api/catalog',
        index: 'vue_storefront_catalog',
        min_score: 0.02,
        csrTimeout: 5000,
        ssrTimeout: 1000,
        queryMethod: 'GET',
        disablePersistentQueriesCache: true,
        searchScoring: {
          attributes: {
            attribute_code: {
              scoreValues: { attribute_value: { weight: 1 } }
            }
          },
          fuzziness: 2,
          cutoff_frequency: 0.01,
          max_expansions: 3,
          minimum_should_match: '75%',
          prefix_length: 2,
          boost_mode: 'multiply',
          score_mode: 'multiply',
          max_boost: 100,
          function_min_score: 1
        },
        searchableAttributes: {
          name: {
            boost: 4
          },
          sku: {
            boost: 2
          },
          'category.name': {
            boost: 1
          }
        }
      }
      config.defaultStoreCode = 'de'

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          defaultCountry: 'US',
          defaultRegion: '',
          sourcePriceIncludesTax: false,
          calculateServerSide: true
        },
        i18n: {
          defaultCountry: 'US',
          defaultLanguage: 'EN',
          availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
          defaultLocale: 'en-US',
          currencyCode: 'USD',
          currencySign: '$',
          currencySignPlacement: 'preppend',
          dateFormat: 'HH:mm D/M/YYYY',
          fullCountryName: 'United States',
          fullLanguageName: 'English',
          bundleAllStoreviewLanguages: true
        },
        elasticsearch: {
          httpAuth: '',
          host: '/api/catalog',
          index: 'vue_storefront_catalog',
          min_score: 0.02,
          csrTimeout: 5000,
          ssrTimeout: 1000,
          queryMethod: 'GET',
          disablePersistentQueriesCache: true,
          searchScoring: {
            attributes: {
              attribute_code: {
                scoreValues: { attribute_value: { weight: 1 } }
              }
            },
            fuzziness: 2,
            cutoff_frequency: 0.01,
            max_expansions: 3,
            minimum_should_match: '75%',
            prefix_length: 2,
            boost_mode: 'multiply',
            score_mode: 'multiply',
            max_boost: 100,
            function_min_score: 1
          },
          searchableAttributes: {
            name: {
              boost: 4
            },
            sku: {
              boost: 2
            },
            'category.name': {
              boost: 1
            }
          }
        },
        storeId: 1,
        storeCode: 'de'
      })
    })

    it('return default storeView with Store Code de with merged values from store de', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        de: {
          storeCode: 'de',
          disabled: true,
          storeId: 3,
          name: 'German Store',
          url: '/de',
          appendStoreCode: true,
          elasticsearch: {
            host: '/api/catalog',
            index: 'vue_storefront_catalog_de'
          },
          tax: {
            sourcePriceIncludesTax: false,
            defaultCountry: 'DE',
            defaultRegion: '',
            calculateServerSide: true
          },
          i18n: {
            fullCountryName: 'Germany',
            fullLanguageName: 'German',
            defaultLanguage: 'DE',
            defaultCountry: 'DE',
            defaultLocale: 'de-DE',
            currencyCode: 'EUR',
            currencySign: 'EUR',
            dateFormat: 'HH:mm D-M-YYYY'
          }
        }
      }

      config.tax = {
        defaultCountry: 'US',
        defaultRegion: '',
        sourcePriceIncludesTax: false,
        calculateServerSide: true
      }

      config.i18n = {
        defaultCountry: 'US',
        defaultLanguage: 'EN',
        availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
        defaultLocale: 'en-US',
        currencyCode: 'USD',
        currencySign: '$',
        currencySignPlacement: 'preppend',
        dateFormat: 'HH:mm D/M/YYYY',
        fullCountryName: 'United States',
        fullLanguageName: 'English',
        bundleAllStoreviewLanguages: true
      }

      config.elasticsearch = {
        httpAuth: '',
        host: '/api/catalog',
        index: 'vue_storefront_catalog',
        min_score: 0.02,
        csrTimeout: 5000,
        ssrTimeout: 1000,
        queryMethod: 'GET',
        disablePersistentQueriesCache: true,
        searchScoring: {
          attributes: {
            attribute_code: {
              scoreValues: { attribute_value: { weight: 1 } }
            }
          },
          fuzziness: 2,
          cutoff_frequency: 0.01,
          max_expansions: 3,
          minimum_should_match: '75%',
          prefix_length: 2,
          boost_mode: 'multiply',
          score_mode: 'multiply',
          max_boost: 100,
          function_min_score: 1
        },
        searchableAttributes: {
          name: {
            boost: 4
          },
          sku: {
            boost: 2
          },
          'category.name': {
            boost: 1
          }
        }
      }
      config.defaultStoreCode = 'de'

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          sourcePriceIncludesTax: false,
          defaultCountry: 'DE',
          defaultRegion: '',
          calculateServerSide: true
        },
        i18n: {
          fullCountryName: 'Germany',
          fullLanguageName: 'German',
          defaultLanguage: 'DE',
          defaultCountry: 'DE',
          defaultLocale: 'de-DE',
          currencyCode: 'EUR',
          currencySign: 'EUR',
          dateFormat: 'HH:mm D-M-YYYY',
          availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
          currencySignPlacement: 'preppend',
          bundleAllStoreviewLanguages: true
        },
        elasticsearch: {
          httpAuth: '',
          host: '/api/catalog',
          index: 'vue_storefront_catalog_de',
          min_score: 0.02,
          csrTimeout: 5000,
          ssrTimeout: 1000,
          queryMethod: 'GET',
          disablePersistentQueriesCache: true,
          searchScoring: {
            attributes: {
              attribute_code: {
                scoreValues: { attribute_value: { weight: 1 } }
              }
            },
            fuzziness: 2,
            cutoff_frequency: 0.01,
            max_expansions: 3,
            minimum_should_match: '75%',
            prefix_length: 2,
            boost_mode: 'multiply',
            score_mode: 'multiply',
            max_boost: 100,
            function_min_score: 1
          },
          searchableAttributes: {
            name: {
              boost: 4
            },
            sku: {
              boost: 2
            },
            'category.name': {
              boost: 1
            }
          }
        },
        storeId: 3,
        name: 'German Store',
        appendStoreCode: true,
        disabled: true,
        url: '/de',
        storeCode: 'de'
      })
    })

    it('return default storeView with Store Code it with merged values from store it', () => {
      rootStore.state.storeView = {}
      rootStore.state.user = {}

      config.storeViews = {
        de: {
          storeCode: 'de',
          disabled: true,
          storeId: 3,
          name: 'German Store',
          url: '/de',
          appendStoreCode: true,
          elasticsearch: {
            host: '/api/catalog',
            index: 'vue_storefront_catalog_de'
          },
          tax: {
            sourcePriceIncludesTax: false,
            defaultCountry: 'DE',
            defaultRegion: '',
            calculateServerSide: true
          },
          i18n: {
            fullCountryName: 'Germany',
            fullLanguageName: 'German',
            defaultLanguage: 'DE',
            defaultCountry: 'DE',
            defaultLocale: 'de-DE',
            currencyCode: 'EUR',
            currencySign: 'EUR',
            dateFormat: 'HH:mm D-M-YYYY'
          }
        },
        it: {
          extend: 'de',
          storeCode: 'it',
          disabled: true,
          storeId: 4,
          name: 'Italian Store',
          url: '/it',
          elasticsearch: {
            host: '/api/catalog',
            index: 'vue_storefront_catalog_it'
          },
          tax: {
            defaultCountry: 'IT'
          },
          i18n: {
            fullCountryName: 'Italy',
            fullLanguageName: 'Italian',
            defaultCountry: 'IT',
            defaultLanguage: 'IT',
            defaultLocale: 'it-IT'
          }
        }
      }

      config.tax = {
        defaultCountry: 'US',
        defaultRegion: '',
        sourcePriceIncludesTax: false,
        calculateServerSide: true
      }

      config.i18n = {
        defaultCountry: 'US',
        defaultLanguage: 'EN',
        availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
        defaultLocale: 'en-US',
        currencyCode: 'USD',
        currencySign: '$',
        currencySignPlacement: 'preppend',
        dateFormat: 'HH:mm D/M/YYYY',
        fullCountryName: 'United States',
        fullLanguageName: 'English',
        bundleAllStoreviewLanguages: true
      }

      config.elasticsearch = {
        httpAuth: '',
        host: '/api/catalog',
        index: 'vue_storefront_catalog',
        min_score: 0.02,
        csrTimeout: 5000,
        ssrTimeout: 1000,
        queryMethod: 'GET',
        disablePersistentQueriesCache: true,
        searchScoring: {
          attributes: {
            attribute_code: {
              scoreValues: { attribute_value: { weight: 1 } }
            }
          },
          fuzziness: 2,
          cutoff_frequency: 0.01,
          max_expansions: 3,
          minimum_should_match: '75%',
          prefix_length: 2,
          boost_mode: 'multiply',
          score_mode: 'multiply',
          max_boost: 100,
          function_min_score: 1
        },
        searchableAttributes: {
          name: {
            boost: 4
          },
          sku: {
            boost: 2
          },
          'category.name': {
            boost: 1
          }
        }
      }
      config.defaultStoreCode = 'it'

      expect(prepareStoreView(null)).toStrictEqual({
        tax: {
          sourcePriceIncludesTax: false,
          defaultCountry: 'IT',
          defaultRegion: '',
          calculateServerSide: true
        },
        i18n: {
          fullCountryName: 'Italy',
          fullLanguageName: 'Italian',
          defaultCountry: 'IT',
          defaultLanguage: 'IT',
          defaultLocale: 'it-IT',
          currencyCode: 'EUR',
          currencySign: 'EUR',
          dateFormat: 'HH:mm D-M-YYYY',
          availableLocale: ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'nl-NL', 'jp-JP', 'ru-RU', 'it-IT', 'pt-BR', 'pl-PL', 'cs-CZ'],
          currencySignPlacement: 'preppend',
          bundleAllStoreviewLanguages: true
        },
        elasticsearch: {
          httpAuth: '',
          host: '/api/catalog',
          index: 'vue_storefront_catalog_it',
          min_score: 0.02,
          csrTimeout: 5000,
          ssrTimeout: 1000,
          queryMethod: 'GET',
          disablePersistentQueriesCache: true,
          searchScoring: {
            attributes: {
              attribute_code: {
                scoreValues: { attribute_value: { weight: 1 } }
              }
            },
            fuzziness: 2,
            cutoff_frequency: 0.01,
            max_expansions: 3,
            minimum_should_match: '75%',
            prefix_length: 2,
            boost_mode: 'multiply',
            score_mode: 'multiply',
            max_boost: 100,
            function_min_score: 1
          },
          searchableAttributes: {
            name: {
              boost: 4
            },
            sku: {
              boost: 2
            },
            'category.name': {
              boost: 1
            }
          }
        },
        storeId: 4,
        extend: 'de',
        name: 'Italian Store',
        appendStoreCode: true,
        disabled: true,
        url: '/it',
        storeCode: 'it'
      })
    })
  })
})
