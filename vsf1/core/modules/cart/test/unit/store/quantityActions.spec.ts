import * as types from '@vue-storefront/core/modules/cart/store/mutation-types';
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
    getShippingMethods: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/app', () => ({ router: jest.fn() }));
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
    return true;
  },
  onlineHelper: {
    get isOnline () {
      return true;
    }
  },
  processLocalizedURLAddress: url => url
}));

describe('Cart quantityActions', () => {
  it('restores original quantity', async () => {
    const cartItem = { sku: 1, name: 'product1', prev_qty: 2 }
    const clientItem = { sku: 1, name: 'product1' }

    const contextMock = createContextMock();

    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => cartItem);
    await (cartActions as any).restoreQuantity(contextMock, { product: clientItem })
    expect(contextMock.dispatch).toBeCalledWith('getItem', { product: clientItem })
    expect(contextMock.dispatch).toBeCalledWith('updateItem', { product: { ...clientItem, qty: 2 } })
  });

  it('removes item that has not quantity', async () => {
    const cartItem = { sku: 1, name: 'product1' }
    const clientItem = { sku: 1, name: 'product1' }

    const contextMock = createContextMock();

    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => cartItem);
    await (cartActions as any).restoreQuantity(contextMock, { product: clientItem });
    expect(contextMock.dispatch).toBeCalledWith('getItem', { product: clientItem })
    expect(contextMock.dispatch).toBeCalledWith('removeItem', { product: cartItem, removeByParentSku: false })
  });

  it('updates quantity', async () => {
    const product = { sku: 1, name: 'product1', qty: 2, server_item_id: 1 }

    const contextMock = createContextMock({
      getters: {
        isCartSyncEnabled: true
      }
    });

    await (cartActions as any).updateQuantity(contextMock, { product, qty: 3 });
    expect(contextMock.commit).toBeCalledWith(types.CART_UPD_ITEM, { product, qty: 3 })
    expect(contextMock.dispatch).toBeCalledWith('sync', { forceClientState: true })
  })
});
