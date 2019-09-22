import * as types from '@vue-storefront/core/modules/cart/store/mutation-types';
import {
  prepareShippingInfoForUpdateTotals,
  createOrderData,
  createShippingInfoData
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
  preparePaymentMethodsToSync: jest.fn(),
  prepareShippingInfoForUpdateTotals: jest.fn(),
  createOrderData: jest.fn(),
  createShippingInfoData: jest.fn()
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

describe('Cart totalsActions', () => {
  it('replaces server totals', async () => {
    const itemsAfterTotal = {
      key1: { qty: 1, param1: 1, param2: 2, item_id: 1 },
      key2: { qty: 3, param1: 3, param2: 5, item_id: 2 },
      key3: { qty: 5, param1: 1, param2: 6, item_id: 3 }
    }
    const totals = { total_segments: {} }
    const contextMock = createContextMock();

    (contextMock.dispatch as jest.Mock).mockImplementationOnce(async () => ({
      resultCode: 200,
      result: { totals }
    }));
    (prepareShippingInfoForUpdateTotals as jest.Mock).mockImplementation(() => itemsAfterTotal);

    await (cartActions as any).overrideServerTotals(contextMock, { addressInformation: {}, hasShippingInformation: true });
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'updateItem', {
      product: { qty: 1, server_item_id: 1, totals: { item_id: 1, param1: 1, param2: 2, qty: 1 } }
    })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(3, 'updateItem', {
      product: { qty: 3, server_item_id: 2, totals: { item_id: 2, param1: 3, param2: 5, qty: 3 } }
    })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(4, 'updateItem', {
      product: { qty: 5, server_item_id: 3, totals: { item_id: 3, param1: 1, param2: 6, qty: 5 } }
    })
    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_UPD_TOTALS, { itemsAfterTotal, totals, platformTotalSegments: totals.total_segments })
  });

  it('synchronizes totals', async () => {
    (createOrderData as jest.Mock).mockImplementation(() => ({ country: 'US', method_code: 'XXX' }));
    (createShippingInfoData as jest.Mock).mockImplementation(() => 'address information');
    const contextMock = createContextMock({
      rootGetters: {
        'checkout/getShippingDetails': {},
        'checkout/getShippingMethods': {},
        'checkout/getPaymentMethods': {}
      },
      getters: {
        canSyncTotals: true,
        isTotalsSyncRequired: true
      }
    });
    await (cartActions as any).syncTotals(contextMock, {});
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'pullMethods', {})
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'overrideServerTotals', { hasShippingInformation: 'XXX', addressInformation: 'address information' })
  })
});
