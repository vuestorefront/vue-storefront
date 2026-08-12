import cartActions from '@vue-storefront/core/modules/cart/store/actions/couponActions';
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types';
import { IS_CART_SYNCING, IS_COUPON_PROCESSING } from '@vue-storefront/core/modules/cart/store/getter-types';
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
jest.mock('@vue-storefront/core/helpers', () => ({
  get isServer () {
    return true
  },
  once: jest.fn((_, callback) => callback()),
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
    await (cartActions as any).applyCoupon(contextMock, { couponCode: 'coupon-code' })

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

  it('blocks public pending coupon application during cart synchronization', async () => {
    const contextMock = createContextMock({
      getters: {
        [IS_CART_SYNCING]: true
      }
    })

    const result = await (cartActions as any).applyPendingCoupon(contextMock)

    expect(result).toBe(false)
    expect(contextMock.dispatch).not.toBeCalled()
  })

  it('applies a pending coupon owned by the cart transaction', async () => {
    const contextMock = createContextMock({
      getters: {
        getPendingCouponCode: 'coupon-code',
        getCoupon: false,
        [IS_CART_SYNCING]: true,
        [IS_COUPON_PROCESSING]: false
      }
    })
    contextMock.dispatch.mockResolvedValue({ resultCode: 200 })

    const result = await (cartActions as any).applyPendingCouponInCartTransaction(contextMock)

    expect(result).toBe(true)
    expect(contextMock.dispatch).toBeCalledWith('applyCoupon', {
      couponCode: 'coupon-code',
      silent: true
    })
    expect(contextMock.commit).toBeCalledWith(types.CART_SET_PENDING_COUPON, null)
  })
})
