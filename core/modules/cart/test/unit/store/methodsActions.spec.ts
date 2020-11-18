import * as types from '@vue-storefront/core/modules/cart/store/mutation-types';
import { CartService } from '@vue-storefront/core/data-resolver';
import { preparePaymentMethodsToSync, createOrderData } from '@vue-storefront/core/modules/cart/helpers';
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
jest.mock('storefront-query-builder', () => jest.fn());
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
  createOrderData: jest.fn()
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

describe('Cart methodsActions', () => {
  it('fetches payment and shipping methods', async () => {
    const contextMock = createContextMock({
      getters: {
        isTotalsSyncRequired: true
      }
    })

    await (cartActions as any).pullMethods(contextMock, { forceServerSync: false });
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'syncShippingMethods', { forceServerSync: false })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'syncPaymentMethods', { forceServerSync: false })
  });

  it('sets default shipping methods', async () => {
    const contextMock = createContextMock({
      rootGetters: {
        'checkout/getDefaultShippingMethod': { shipping: 1 }
      },
      getters: {
        getShippingMethodCode: false,
        getPaymentMethodCode: true
      }
    })

    await (cartActions as any).setDefaultCheckoutMethods(contextMock);
    expect(contextMock.commit).toBeCalledWith(types.CART_UPD_SHIPPING, { shipping: 1 })
  })

  it('sets default payment methods', async () => {
    const contextMock = createContextMock({
      rootGetters: {
        'checkout/getDefaultPaymentMethod': { payment: 1 }
      },
      getters: {
        getShippingMethodCode: true,
        getPaymentMethodCode: false
      }
    })

    await (cartActions as any).setDefaultCheckoutMethods(contextMock);
    expect(contextMock.commit).toBeCalledWith(types.CART_UPD_PAYMENT, { payment: 1 })
  })

  it('synchronizes payment methods', async () => {
    const contextMock = createContextMock({
      rootGetters: {
        'checkout/getNotServerPaymentMethods': [],
        'checkout/getPaymentDetails': { country: 'US' }
      },
      getters: {
        canUpdateMethods: true,
        isTotalsSyncRequired: true
      }
    });

    (CartService.getPaymentMethods as jest.Mock).mockImplementation(() => Promise.resolve({ result: {} }));
    (createOrderData as jest.Mock).mockImplementation(() => ({ shippingMethodsData: {} }));
    (preparePaymentMethodsToSync as jest.Mock).mockImplementation(() => ({ uniqueBackendMethods: [], paymentMethods: [] }));

    await (cartActions as any).syncPaymentMethods(contextMock, {});
    expect(contextMock.dispatch).toBeCalledWith('checkout/replacePaymentMethods', [], { root: true })
  })

  it('synchronizes shipping methods', async () => {
    const contextMock = createContextMock({
      rootGetters: {
        'checkout/getShippingDetails': { country: 'US' }
      },
      getters: {
        canUpdateMethods: true,
        isTotalsSyncRequired: true
      }
    });

    (CartService.getShippingMethods as jest.Mock).mockImplementation(() => Promise.resolve({ result: [] }));

    await (cartActions as any).syncShippingMethods(contextMock, {});
    expect(contextMock.dispatch).toBeCalledWith('updateShippingMethods', { shippingMethods: [] })
  })

  it('updates shipping methods', async () => {
    const contextMock = createContextMock()
    await (cartActions as any).updateShippingMethods(contextMock, { shippingMethods: [{ method: 1 }] });
    expect(contextMock.dispatch).toBeCalledWith('checkout/replaceShippingMethods', [{ is_server_method: true, method: 1 }], { root: true })
  })

  it('doesn\'t add not available method', async () => {
    const contextMock = createContextMock()
    await (cartActions as any).updateShippingMethods(contextMock, { shippingMethods: [{ method: 1, available: false }] });
    expect(contextMock.dispatch).toBeCalledWith('checkout/replaceShippingMethods', [], { root: true })
  })
});
