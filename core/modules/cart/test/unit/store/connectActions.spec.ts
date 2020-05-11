import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import config from 'config';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { CartService } from '@vue-storefront/core/data-resolver'
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
  getCartToken: jest.fn()
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

describe('Cart connectActions', () => {
  it('clear deletes all cart products and token', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: { isCartSyncEnabled: false }
    };
    const wrapper = (actions: any) => actions.clear(contextMock);
    config.cart = { synchronize: false };

    await wrapper(cartActions);

    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_LOAD_CART, []);
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'sync', { forceClientState: true, forceSync: true });
    expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.CART_SET_ITEMS_HASH, null);
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'disconnect');
  });

  it('clear deletes all cart products but keep token', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: { isCartSyncEnabled: false }
    };
    const wrapper = (actions: any) => actions.clear(contextMock, { disconnect: false });

    config.cart = { synchronize: false };

    await wrapper(cartActions);

    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_LOAD_CART, []);
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'sync', { forceClientState: true, forceSync: true });
  });

  it('clear deletes all cart products and token, but not sync with backend', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: { isCartSyncEnabled: false }
    };
    const wrapper = (actions: any) => actions.clear(contextMock, { sync: false });

    config.cart = { synchronize: false };

    await wrapper(cartActions);

    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_LOAD_CART, []);
    expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.CART_SET_ITEMS_HASH, null);
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'disconnect');
  });

  it('disconnects cart', async () => {
    const contextMock = createContextMock()
    await (cartActions as any).disconnect(contextMock)
    expect(contextMock.commit).toBeCalledWith(types.CART_LOAD_CART_SERVER_TOKEN, null);
  })

  it('authorizes server cart token', async () => {
    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      getItem: async () => 1
    }));

    const contextMock = createContextMock({
      getters: {
        getCoupon: {
          code: null
        }
      }
    })

    await (cartActions as any).authorize(contextMock)
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'connect', { guestCart: false, mergeQty: true });
  })

  it('creates cart token', async () => {
    (CartService.getCartToken as jest.Mock).mockImplementation(async () =>
      ({ resultCode: 200, result: 'server-cart-token' })
    );

    const contextMock = createContextMock({
      getters: {
        isCartSyncEnabled: true
      }
    })

    config.cart = {
      serverMergeByDefault: false
    }

    await (cartActions as any).connect(contextMock, {})
    expect(contextMock.commit).toBeCalledWith(types.CART_LOAD_CART_SERVER_TOKEN, 'server-cart-token')
    expect(contextMock.dispatch).toBeCalledWith('sync', { forceClientState: false, dryRun: true, mergeQty: false })
  })

  it('attempts bypassing guest cart', async () => {
    (CartService.getCartToken as jest.Mock).mockImplementation(async () =>
      ({ resultCode: 401, result: null })
    );

    const contextMock = createContextMock({
      getters: {
        isCartSyncEnabled: true,
        bypassCounter: 0
      }
    })

    config.cart = {
      serverMergeByDefault: false
    }
    config.queues = {
      maxCartBypassAttempts: 4
    }

    await (cartActions as any).connect(contextMock, {})
    expect(contextMock.commit).toBeCalledWith(types.CART_UPDATE_BYPASS_COUNTER, { counter: 1 })
    expect(contextMock.dispatch).toBeCalledWith('connect', { guestCart: true })
  })
  it('Create cart token when there are products in cart and we don\'t have token already', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: { getCartItems: [{ id: 1 }], getCartToken: '' }
    };

    const wrapper = (actions: any) => actions.create(contextMock);

    await wrapper(cartActions);

    expect(contextMock.dispatch).toBeCalledWith('connect', { guestCart: false });
  })
  it('doesn\'t create cart token when there are NO products in cart', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: { getCartItems: [], getCartToken: '' }
    };

    const wrapper = (actions: any) => actions.create(contextMock);

    await wrapper(cartActions);

    expect(contextMock.dispatch).toHaveBeenCalledTimes(0);
  })
  it('doesn\'t create cart token when there are products in cart but we have token already', async () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      getters: { getCartItems: [{ id: 1 }], getCartToken: 'xyz' }
    };

    const wrapper = (actions: any) => actions.create(contextMock);

    await wrapper(cartActions);

    expect(contextMock.dispatch).toHaveBeenCalledTimes(0);
  })
})
