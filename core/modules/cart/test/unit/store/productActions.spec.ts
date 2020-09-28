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

describe('Cart productActions', () => {
  it('finds configurable children', async () => {
    const serverItem = { sku: 1, name: 'product1', product_type: 'configurable' }
    const contextMock = createContextMock();

    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => ({ items: [serverItem] }));
    const result = await (cartActions as any).findProductOption(contextMock, { serverItem });
    expect(contextMock.dispatch).toBeCalledWith('product/findProducts', { query: { _appliedFilters: [{ attribute: 'configurable_children.sku', options: Object, scope: 'default', value: { eq: 1 } }], _availableFilters: [], _appliedSort: [], _searchText: '' }, size: 1, start: 0, options: { populateRequestCacheTags: false, prefetchGroupProducts: false, separateSelectedVariant: true } }, { root: true })
    expect(result).toEqual({ childSku: 1, sku: 1 })
  });

  it('finds product variant', async () => {
    const serverItem = { sku: 1, name: 'product1', product_type: 'configurable', qty: 1, quote_id: 1, item_id: 1, product_option: 'opt1' }
    const contextMock = createContextMock();

    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => ({}));
    (contextMock.dispatch as jest.Mock).mockImplementationOnce(() => ({ sku: 1, name: 'product1', product_type: 'configurable', opt1: 1 }));

    const result = await (cartActions as any).getProductVariant(contextMock, { serverItem });
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'findProductOption', { serverItem })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'product/single', { options: {} }, { root: true })
    expect(result).toEqual({
      name: 'product1',
      opt1: 1,
      product_option: 'opt1',
      product_type: 'configurable',
      qty: 1,
      server_cart_id: 1,
      server_item_id: 1,
      sku: 1
    })
  });
});
