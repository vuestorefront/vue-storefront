import { prepareStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'
import rootStore from '@vue-storefront/core/store';

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))
jest.mock('@vue-storefront/core/lib/sync/task', () => ({ initializeSyncTaskStorage: jest.fn() }))
jest.mock('config', () => ({}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))

describe('prepareStoreView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (rootStore as any).state = {};
    Object.keys(config).forEach((key) => { delete config[key]; });
  })

  it('returns default storeView given no storecode', async () => {
    rootStore.state.storeView = {}
    rootStore.state.user = {}

    config.storeViews = {
      multistore: false,
      mapStoreUrlsFor: ['de'],
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
    config.defaultStoreCode = ''

    config.seo = {
      defaultTitle: 'Vue Storefront'
    }

    expect(await prepareStoreView(null)).toStrictEqual({
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

  it('returns default storeView without setting defaultStoreCode when multistore mode is disabled', async () => {
    rootStore.state.storeView = {}
    rootStore.state.user = {}

    config.storeViews = {
      multistore: false,
      mapStoreUrlsFor: ['de'],
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

    expect(await prepareStoreView(null)).toStrictEqual({
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

  it('returns default storeView with defaultStoreCode set when multistore mode is enabled', async () => {
    rootStore.state.storeView = {}
    rootStore.state.user = {}

    config.storeViews = {
      mapStoreUrlsFor: ['de'],
      multistore: true,
      de: {
        storeCode: 'de',
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

    expect(await prepareStoreView(null)).toStrictEqual({
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

  it('returns storeView overwritting default store config values when multistore mode is enabled', async () => {
    rootStore.state.storeView = {}
    rootStore.state.user = {}

    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['de'],
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

    expect(await prepareStoreView(null)).toStrictEqual({
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

  it('returns storeView extending other storeView in multistore mode', async () => {
    rootStore.state.storeView = {}
    rootStore.state.user = {}

    config.storeViews = {
      multistore: true,
      mapStoreUrlsFor: ['de', 'it'],
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

    expect(await prepareStoreView(null)).toStrictEqual({
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
