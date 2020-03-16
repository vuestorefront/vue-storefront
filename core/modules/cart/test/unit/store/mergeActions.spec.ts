import * as types from '@vue-storefront/core/modules/cart/store/mutation-types';
import config from 'config';
import { CartService } from '@vue-storefront/core/data-resolver';
import {
  productsEquals,
  createCartItemForUpdate,
  createDiffLog
} from '@vue-storefront/core/modules/cart/helpers';
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
    updateItem: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    get: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/app', () => ({ router: jest.fn() }));
jest.mock('@vue-storefront/core/lib/search/searchQuery', () => jest.fn());
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
  }))
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

describe('Cart mergeActions', () => {
  it('updates client item', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 2,
      item_id: 1
    };

    const contextMock = createContextMock();

    await (cartActions as any).updateClientItem(contextMock, { clientItem, serverItem });

    expect(contextMock.dispatch).toBeCalledWith('updateItem', {
      product: {
        prev_qty: 2,
        product_option: 'a',
        server_cart_id: undefined,
        server_item_id: 1,
        sku: '1',
        type_id: 'b'
      }
    });
  });

  it('updates server item - removes when updating was not successful', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1, item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 2,
      item_id: 1
    };

    (createCartItemForUpdate as jest.Mock).mockImplementation(() => clientItem);
    (CartService.updateItem as jest.Mock).mockImplementation(() => Promise.resolve({ resultCode: 500 }));

    const contextMock = createContextMock({
      getters: {
        getCartToken: 'cart-token'
      }
    });

    await (cartActions as any).updateServerItem(contextMock, { clientItem, serverItem: null });
    expect(contextMock.commit).toBeCalledWith(types.CART_DEL_ITEM, { product: clientItem, removeByParentSku: false })
  })

  it('updates server item - restoring quantity', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1, item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 2,
      item_id: 1
    };

    (createCartItemForUpdate as jest.Mock).mockImplementation(() => clientItem);
    (CartService.updateItem as jest.Mock).mockImplementation(() => Promise.resolve({ resultCode: 500 }));

    const contextMock = createContextMock({
      getters: {
        getCartToken: 'cart-token'
      }
    });

    await (cartActions as any).updateServerItem(contextMock, { clientItem, serverItem });
    expect(contextMock.commit).not.toBeCalledWith(types.CART_DEL_ITEM, { product: clientItem, removeByParentSku: false })
    expect(contextMock.dispatch).toBeCalledWith('restoreQuantity', { cartItem: clientItem, clientItem })
  })

  it('updates server item - deletes non confirmed item', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 2,
      item_id: 1
    };

    (createCartItemForUpdate as jest.Mock).mockImplementation(() => clientItem);
    (CartService.updateItem as jest.Mock).mockImplementation(() => Promise.resolve({ resultCode: 500 }));

    const contextMock = createContextMock({
      getters: {
        getCartToken: 'cart-token'
      }
    });

    await (cartActions as any).updateServerItem(contextMock, { clientItem, serverItem });
    expect(contextMock.commit).not.toBeCalledWith(types.CART_DEL_ITEM, { product: clientItem, removeByParentSku: false })
    expect(contextMock.dispatch).not.toBeCalledWith('restoreQuantity', { cartItem: clientItem, clientItem })
    expect(contextMock.commit).toBeCalledWith(types.CART_DEL_NON_CONFIRMED_ITEM, { product: clientItem })
  })

  it('updates server item - apply changes for client item', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 2,
      item_id: 1
    };

    (createCartItemForUpdate as jest.Mock).mockImplementation(() => clientItem);
    (CartService.updateItem as jest.Mock).mockImplementation(() => Promise.resolve({ resultCode: 200, result: serverItem }));

    const contextMock = createContextMock({
      getters: {
        getCartToken: 'cart-token'
      },
      rootGetters: {
        'checkout/isUserInCheckout': true
      }
    });

    await (cartActions as any).updateServerItem(contextMock, { clientItem, serverItem });
    expect(contextMock.commit).not.toBeCalledWith(types.CART_DEL_ITEM, { product: clientItem, removeByParentSku: false })
    expect(contextMock.dispatch).not.toBeCalledWith('restoreQuantity', { cartItem: clientItem, clientItem })
    expect(contextMock.commit).not.toBeCalledWith(types.CART_DEL_NON_CONFIRMED_ITEM, { product: clientItem })
    expect(contextMock.dispatch).toBeCalledWith('updateClientItem', { clientItem, serverItem: serverItem })
  })

  it('synchronizes item with server when there is no given server item', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 2,
      item_id: 1
    };

    config.cart = {
      serverSyncCanRemoveLocalItems: false
    }

    const contextMock = createContextMock()

    await (cartActions as any).synchronizeServerItem(contextMock, { clientItem, serverItem: null });
    expect(contextMock.dispatch).toBeCalledWith('updateServerItem', { clientItem, serverItem: null, updateIds: false })
  })

  it('synchronizes item with server when there quantities are different', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 1,
      item_id: 1
    };

    config.cart = {
      serverSyncCanRemoveLocalItems: false
    }

    const contextMock = createContextMock()

    await (cartActions as any).synchronizeServerItem(contextMock, { clientItem, serverItem });
    expect(contextMock.dispatch).not.toBeCalledWith('updateServerItem', { clientItem, serverItem: null, updateIds: false })
    expect(contextMock.dispatch).toBeCalledWith('updateServerItem', { clientItem, serverItem, updateIds: true })
  })

  it('merges client item', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 1,
      item_id: 1
    };

    const contextMock = createContextMock();
    (productsEquals as jest.Mock).mockImplementation(() => true);
    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ isEmpty: () => true }));

    await (cartActions as any).mergeClientItem(contextMock, { clientItem, serverItems: [serverItem], forceClientState: false, dryRun: false });
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'synchronizeServerItem', { serverItem, clientItem, forceClientState: false, dryRun: false })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'updateItem', { product: { product_option: 'a', server_cart_id: undefined, server_item_id: 1, sku: '1', type_id: 'b' } })
  })

  it('merges server item', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 1,
      item_id: 1
    };

    const contextMock = createContextMock();

    (productsEquals as jest.Mock).mockImplementation(() => false);
    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => Promise.resolve(serverItem));

    await (cartActions as any).mergeServerItem(contextMock, { clientItems: [clientItem], serverItem, forceClientState: false, dryRun: false });
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'getProductVariant', { serverItem })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'addItem', { productToAdd: serverItem, forceServerSilence: true })
  })

  it('updates totals after merge', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };

    const contextMock = createContextMock({
      getters: {
        isTotalsSyncRequired: true,
        getCurrentCartHash: 'cart-hash'
      }
    });
    await (cartActions as any).updateTotalsAfterMerge(contextMock, { clientItems: [clientItem], dryRun: false });
    expect(contextMock.dispatch).toBeCalledWith('syncTotals')
    expect(contextMock.commit).toBeCalledWith(types.CART_SET_ITEMS_HASH, 'cart-hash')
  })

  it('merges client and server cart', async () => {
    const clientItem = { sku: '1', name: 'product1', qty: 2, server_item_id: 1 };
    const serverItem = {
      sku: '1',
      name: 'product1',
      server_item_id: 1,
      server_cart_id: 12,
      product_option: 'a',
      product_type: 'b',
      qty: 1,
      item_id: 1
    };
    const contextMock = createContextMock({
      getters: {
        isCartHashChanged: false
      }
    });

    const diffLog = {
      pushServerParty: () => diffLog,
      pushClientParty: () => diffLog,
      merge: () => diffLog
    };

    (createDiffLog as jest.Mock).mockImplementation(() => diffLog)

    await (cartActions as any).merge(contextMock, { clientItems: [clientItem], serverItems: [serverItem] });
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'mergeClientItems', { clientItems: [clientItem], serverItems: [serverItem], dryRun: false, forceClientState: false, mergeQty: false })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'mergeServerItems', { clientItems: [clientItem], serverItems: [serverItem], dryRun: false, forceClientState: false, mergeQty: false })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(3, 'updateTotalsAfterMerge', { clientItems: [clientItem], dryRun: false })
  })
});
