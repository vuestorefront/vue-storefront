import cartActions from '@vue-storefront/core/modules/cart/store/actions';
import { createContextMock } from '@vue-storefront/unit-tests/utils';

jest.mock('@vue-storefront/core/store', () => ({
  dispatch: jest.fn(),
  state: {}
}));
jest.mock('js-sha3', () => ({ sha3_224: jest.fn() }));
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('config', () => ({}));
jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn(),
  localizedRoute: jest.fn()
}));
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {}),
    debug: jest.fn(() => () => {}),
    warn: jest.fn(() => () => {}),
    error: jest.fn(() => () => {}),
    info: jest.fn(() => () => {})
  }
}));
jest.mock('@vue-storefront/core/data-resolver', () => ({ CartService: {
  applyCoupon: async () => ({ result: true }),
  removeCoupon: async () => ({ result: true })
} }));
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/app', () => ({ router: jest.fn() }));
jest.mock('@vue-storefront/core/lib/search/searchQuery', () => jest.fn());
jest.mock('@vue-storefront/core/helpers', () => ({
  get isServer () {
    return true
  },
  onlineHelper: {
    get isOnline () {
      return true
    }
  },
  processLocalizedURLAddress: (url) => url
}));

describe('Cart couponActions', () => {
  it('applies coupon', async () => {
    const contextMock = createContextMock({
      getters: {
        canSyncTotals: true
      }
    })
    await (cartActions as any).applyCoupon(contextMock, 'coupon-code')

    expect(contextMock.dispatch).toBeCalledWith('syncTotals', { forceServerSync: true })
  })

  it('removes coupon', async () => {
    const contextMock = createContextMock({
      getters: {
        canSyncTotals: true
      }
    })
    await (cartActions as any).removeCoupon(contextMock)

    expect(contextMock.dispatch).toBeCalledWith('syncTotals', { forceServerSync: true })
  })
})
