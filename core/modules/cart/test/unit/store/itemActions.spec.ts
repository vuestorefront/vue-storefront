import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { configureProductAsync } from '@vue-storefront/core/modules/catalog/helpers'
import { prepareProductsToAdd, productsEquals, validateProduct } from '@vue-storefront/core/modules/cart/helpers'
import cartActions from '@vue-storefront/core/modules/cart/store/actions';
import { createContextMock } from '@vue-storefront/unit-tests/utils';
import config from 'config';

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
jest.mock('@vue-storefront/core/app', () => ({ router: jest.fn() }))
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
  createDiffLog: () => ({
    pushNotifications: jest.fn(),
    merge: jest.fn()
  })
}));
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
jest.mock('config', () => ({}));

describe('Cart itemActions', () => {
  it('configures item and deletes when there is same sku', async () => {
    const product1 = { sku: 1, name: 'product1', server_item_id: 1 }
    const product2 = { sku: 2, name: 'product2', server_item_id: 2 }

    const contextMock = createContextMock({
      getters: {
        isCartSyncEnabled: true,
        getCartItems: [product2]
      },
      dispatch: jest.fn((actionName) => {
        switch (actionName) {
          case 'product/getProductVariant': {
            return product2
          }
        }
      })
    })

    await (cartActions as any).configureItem(contextMock, { product: product1, configuration: {} })
    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_DEL_ITEM, { product: product2 })
    expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.CART_UPD_ITEM_PROPS, { product: { ...product1, ...product2 } })
    expect(contextMock.dispatch).toBeCalledWith('sync', { forceClientState: true })
  })

  it('configures item', async () => {
    const product1 = { sku: 1, name: 'product1', server_item_id: 1 }
    const product2 = { sku: 2, name: 'product2', server_item_id: 2 }

    const contextMock = createContextMock({
      getters: {
        isCartSyncEnabled: true,
        getCartItems: [product1]
      },
      dispatch: jest.fn((actionName) => {
        switch (actionName) {
          case 'product/getProductVariant': {
            return product2
          }
        }
      })
    })

    await (cartActions as any).configureItem(contextMock, { product: product1, configuration: {} })
    expect(contextMock.commit).not.toHaveBeenNthCalledWith(1, types.CART_DEL_ITEM, { product: product2 })
    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_UPD_ITEM_PROPS, { product: { ...product1, ...product2 } })
    expect(contextMock.dispatch).toBeCalledWith('sync', { forceClientState: true })
  })

  it('adds item to the cart', async () => {
    const product1 = { sku: 1, name: 'product1', server_item_id: 1 }
    const prepareProductsToAddMock = prepareProductsToAdd as jest.Mock
    prepareProductsToAddMock.mockImplementation(() => [product1])
    const contextMock = createContextMock()

    await (cartActions as any).addItem(contextMock, { productToAdd: product1 })

    expect(contextMock.commit).toHaveBeenNthCalledWith(1, types.CART_ADDING_ITEM, { isAdding: true })
    expect(contextMock.dispatch).toBeCalledWith('addItems', { productsToAdd: [product1], forceServerSilence: false })
    expect(contextMock.commit).toHaveBeenNthCalledWith(2, types.CART_ADDING_ITEM, { isAdding: false })
  })

  it('checks product status', async () => {
    (productsEquals as jest.Mock).mockImplementation(() => true)

    const product1 = { sku: 1, name: 'product1', server_item_id: 1, qty: 1 }
    const contextMock = createContextMock({
      getters: {
        getCartItems: [product1]
      }
    })

    await (cartActions as any).checkProductStatus(contextMock, { product: product1 })
    expect(contextMock.dispatch).toBeCalledWith('stock/queueCheck', { product: product1, qty: 2 }, { root: true })
  })

  it('adds items to the cart', async () => {
    (validateProduct as jest.Mock).mockImplementation(() => [])
    const product = { sku: 1, name: 'product1', server_item_id: 1, qty: 1 }

    const contextMock = createContextMock({
      getters: {
        isCartSyncEnabled: true,
        isCartConnected: true
      }
    })

    // The third 'dispatch' call gets an instance of DiffLog class, which has the isEmpty() method.
    // The return value of the second 'dispatch' call is not used at all, so it can be left empty.
    contextMock.dispatch
      .mockImplementationOnce(() => Promise.resolve({ status: 'ok', onlineCheckTaskId: 1 }))
      .mockImplementationOnce(() => Promise.resolve({}))
      .mockImplementationOnce(() => Promise.resolve({ isEmpty: () => { return true } }))

    await (cartActions as any).addItems(contextMock, { productsToAdd: [product] })
    expect(contextMock.commit).toBeCalledWith(types.CART_ADD_ITEM, { product: { ...product, onlineStockCheckid: 1 } })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(1, 'checkProductStatus', { product })
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(2, 'create')
    expect(contextMock.dispatch).toHaveBeenNthCalledWith(3, 'sync', { forceClientState: true })
  })

  it('removes item from the cart', async () => {
    const product = { sku: 1, name: 'product1', server_item_id: 1, qty: 1 }

    const contextMock = createContextMock({
      getters: {
        isCartSyncEnabled: true
      }
    })

    await (cartActions as any).removeItem(contextMock, { product })
    expect(contextMock.commit).toBeCalledWith(types.CART_DEL_ITEM, { product, removeByParentSku: false })
    expect(contextMock.dispatch).toBeCalledWith('sync', { forceClientState: true })
  })
})
