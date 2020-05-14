import * as types from '@vue-storefront/core/modules/cart/store/mutation-types';
import config from 'config';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import { CartService } from '@vue-storefront/core/data-resolver';
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
jest.mock('@vue-storefront/core/data-resolver', () => ({
  CartService: {
    applyCoupon: async () => ({ result: true }),
    removeCoupon: async () => ({ result: true }),
    getPaymentMethods: jest.fn(),
    updateItem: jest.fn(),
    getShippingMethods: jest.fn(),
    getItems: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/app', () => ({ router: jest.fn() }));
jest.mock('@vue-storefront/core/lib/search/searchQuery', () => jest.fn(() => ({ applyFilter: jest.fn() })));
jest.mock('@vue-storefront/core/modules/catalog/helpers', () => ({
  configureProductAsync: jest.fn()
}));
jest.mock('@vue-storefront/core/modules/cart/helpers', () => ({
  prepareProductsToAdd: jest.fn(),
  productsEquals: jest.fn(),
  validateProduct: jest.fn(),
  notifications: {
    createNotifications: jest.fn()
  },
  createCartItemForUpdate: jest.fn(),
  createDiffLog: jest.fn(() => ({
    pushNotifications: jest.fn(),
    pushServerResponse: jest.fn(),
    pushServerParty: jest.fn(),
    pushClientParty: jest.fn(),
    merge: jest.fn(),
    isEmpty: jest.fn()
  })),
  preparePaymentMethodsToSync: jest.fn()
}));
jest.mock('@vue-storefront/core/helpers', () => ({
  get isServer () {
    return false;
  },
  onlineHelper: {
    get isOnline () {
      return true;
    }
  },
  processLocalizedURLAddress: url => url
}));

describe('Cart synchronizeActions', () => {
  it('loads current cart', async () => {
    const contextMock = createContextMock();

    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      getItem: async () => ({})
    }))
    await (cartActions as any).load(contextMock, {});
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'setDefaultCheckoutMethods')
    expect(contextMock.commit).toBeCalledWith(types.CART_LOAD_CART, {})
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'synchronizeCart', { forceClientState: false })
  });

  it('synchronizes cart', async () => {
    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      getItem: async () => 'hash-token'
    }))

    config.cart = {
      synchronize: true,
      serverMergeByDefault: false
    }
    const contextMock = createContextMock();

    await (cartActions as any).synchronizeCart(contextMock, { forceClientState: false });
    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_SET_ITEMS_HASH, 'hash-token')
    expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.CART_LOAD_CART_SERVER_TOKEN, 'hash-token')
    expect(contextMock.dispatch).toBeCalledWith('sync', { forceClientState: false, dryRun: true })
  })

  it('creates a new cart token', async () => {
    (StorageManager.get as jest.Mock).mockImplementation(() => ({
      getItem: async () => null
    }))

    config.cart = {
      synchronize: true,
      serverMergeByDefault: false
    }
    const contextMock = createContextMock();

    await (cartActions as any).synchronizeCart(contextMock, { forceClientState: false });
    expect(contextMock.commit).not.toHaveBeenNthCalledWith(1, types.CART_SET_ITEMS_HASH, 'hash-token')
    expect(contextMock.commit).not.toHaveBeenNthCalledWith(2, types.CART_LOAD_CART_SERVER_TOKEN, 'hash-token')
    expect(contextMock.dispatch).toBeCalledWith('create')
  })

  it('merges current cart', async () => {
    (CartService.getItems as jest.Mock).mockImplementation(async () => ({
      resultCode: 200,
      result: []
    }))

    const contextMock = createContextMock({
      rootGetters: {
        'checkout/isUserInCheckout': true
      },
      getters: {
        getCartItems: [],
        canUpdateMethods: true,
        isSyncRequired: true,
        bypassCounter: 0
      }
    });
    await (cartActions as any).sync(contextMock, {});
    expect(contextMock.dispatch).toBeCalledWith('merge', {
      clientItems: [],
      dryRun: false,
      forceClientState: true,
      serverItems: [],
      mergeQty: false
    })
  })

  it('attempts to bypass guest cart', async () => {
    (CartService.getItems as jest.Mock).mockImplementation(async () => ({
      resultCode: 500,
      result: null
    }))

    config.queues = {
      maxCartBypassAttempts: 4
    }

    const contextMock = createContextMock({
      rootGetters: {
        'checkout/isUserInCheckout': true
      },
      getters: {
        getCartItems: [],
        canUpdateMethods: true,
        isSyncRequired: true,
        bypassCounter: 0
      }
    });

    await (cartActions as any).sync(contextMock, {});
    expect(contextMock.dispatch).toBeCalledWith('connect', { guestCart: true })
  })

  it('removes product when there is out of stock', async () => {
    const product = { sku: 1, name: 'product1' }
    const stockTask = { sku: 1, product_sku: 1, result: { is_in_stock: false, code: 'ok' } }
    config.stock = {
      allowOutOfStockInCart: false
    }
    config.cart = {
      synchronize: false
    }
    const contextMock = createContextMock();

    (contextMock.dispatch as jest.Mock).mockImplementation(() => product)

    await (cartActions as any).stockSync(contextMock, stockTask);
    expect(contextMock.dispatch).toBeCalledWith('getItem', { product: { sku: 1 } })
    expect(contextMock.commit).toBeCalledWith(types.CART_DEL_ITEM, { product: { sku: 1 } }, { root: true })
  })
  it('triggers an error when there is out of stock', async () => {
    const product = { sku: 1, name: 'product1' }
    const stockTask = { sku: 1, product_sku: 1, result: { is_in_stock: false, code: 'ok' } }
    config.stock = {
      allowOutOfStockInCart: true
    }
    config.cart = {
      synchronize: false
    }
    const contextMock = createContextMock();

    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => product)

    await (cartActions as any).stockSync(contextMock, stockTask);
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'getItem', { product: { sku: 1 } })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'updateItem', {
      product: {
        errors: { stock: 'Out of the stock!' },
        is_in_stock: false,
        sku: 1
      }
    })
  })
  it('shows that product is in stock', async () => {
    const product = { sku: 1, name: 'product1' }
    const stockTask = { sku: 1, product_sku: 1, result: { is_in_stock: true, code: 'ok' } }
    config.stock = {
      allowOutOfStockInCart: true
    }
    config.cart = {
      synchronize: false
    }
    const contextMock = createContextMock({
      getters: {
        getCurrentCartHash: 'zyx'
      }
    });

    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => product)

    await (cartActions as any).stockSync(contextMock, stockTask);
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'getItem', { product: { sku: 1 } })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'updateItem', {
      product: {
        info: { stock: 'In stock!' },
        is_in_stock: true,
        sku: 1
      }
    })
  })
});
