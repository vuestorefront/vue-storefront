import {
  adjustMultistoreApiUrl
} from '@vue-storefront/core/lib/multistore'
import rootStore from '@vue-storefront/core/store';

jest.mock('@vue-storefront/core/app', () => ({
  createApp: jest.fn(),
  router: {
    addRoutes: jest.fn()
  }
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))

describe('adjustMultistoreApiUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (rootStore as any).state = {};
  })
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
