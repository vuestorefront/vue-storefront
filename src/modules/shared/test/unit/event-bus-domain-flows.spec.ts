import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { PersonalDetails } from '@vue-storefront/core/modules/checkout/components/PersonalDetails'
import cartMutations from '@vue-storefront/core/modules/cart/store/mutations'
import * as cartMutationTypes from '@vue-storefront/core/modules/cart/store/mutation-types'
import { PaymentBackendMethodsModule } from 'src/modules/payment-backend-methods'
import {
  PersistedCustomerDataModule,
  SET_PERSISTED_CUSTOMER_EMAIL,
  SET_PERSISTED_CUSTOMER_FIRST_NAME,
  SET_PERSISTED_CUSTOMER_LAST_NAME,
  SET_PERSISTED_CUSTOMER_PHONE_NUMBER,
  SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY,
  SET_PERSISTED_CUSTOMER_VAT_ID
} from 'src/modules/persisted-customer-data'
import { saveOrderItemCustomizationsState } from 'src/modules/customization-system/helpers/order-items-customizations.service'
import { BEFORE_STORE_BACKEND_API_REQUEST } from 'src/modules/shared/types/before-store-backend-api-request.event'
import fetch from '@vue-storefront/core/lib/fetch'

jest.mock('config', () => ({
  budsies: {
    endpoint: 'https://backend.example'
  }
}))

jest.mock('@vue-storefront/core/helpers', () => ({
  isServer: false,
  once: (_key: string, callback: () => void) => callback()
}))

jest.mock(
  '@vue-storefront/core/modules/cart/helpers/productsEquals',
  () => jest.fn((first, second) => first.sku === second.sku)
)
jest.mock('@vue-storefront/core/modules/cart/helpers/update-cart-item-estimated-shipment.function', () => ({
  updateCartItemEstimatedShipment: jest.fn()
}))
jest.mock('@vue-storefront/core/modules/catalog', () => ({
  ProductDiscountedPrice: {}
}))

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({
  StorageManager: {
    init: jest.fn()
  }
}))

jest.mock('src/modules/persisted-customer-data/helpers/cache-handler.factory', () => ({
  cacheHandlerFactory: jest.fn(() => ({}))
}))
jest.mock('src/modules/persisted-customer-data/helpers/get-local-storage-items.function', () => ({
  getItemsFromStorage: jest.fn()
}))
jest.mock('src/modules/persisted-customer-data/helpers/register-window-customer-data-updater.function', () => ({
  registerWindowCustomerDataUpdater: jest.fn()
}))
jest.mock('src/modules/shared', () => ({
  BEFORE_STORE_BACKEND_API_REQUEST: 'before-store-backend-api-request',
  UserEvents: {
    CUSTOMER_DATA_CHANGED: 'customer-data-changed'
  },
  localStorageSynchronizationFactory: jest.fn(() => ({
    setItems: jest.fn()
  }))
}))

jest.mock('@vue-storefront/core/lib/fetch', () => jest.fn())
jest.mock('@vue-storefront/core/lib/sync', () => ({
  TaskQueue: {
    execute: jest.fn()
  }
}))

describe('EventBus domain flows', () => {
  beforeEach(() => {
    EventBus.$off()
    jest.clearAllMocks()
  })

  it('preserves the authentication logout state-clearing flow', async () => {
    const store = {
      registerModule: jest.fn(),
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      commit: jest.fn(),
      watch: jest.fn(),
      getters: {}
    }

    await PersistedCustomerDataModule({ store } as any)
    EventBus.$emit('user-after-logout')

    expect(store.commit.mock.calls).toEqual([
      [SET_PERSISTED_CUSTOMER_EMAIL, undefined],
      [SET_PERSISTED_CUSTOMER_FIRST_NAME, undefined],
      [SET_PERSISTED_CUSTOMER_LAST_NAME, undefined],
      [SET_PERSISTED_CUSTOMER_PHONE_NUMBER, undefined],
      [SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY, undefined],
      [SET_PERSISTED_CUSTOMER_VAT_ID, undefined]
    ])
  })

  it('preserves cart mutation event names, payloads, and order', () => {
    const calls: [string, any][] = []
    EventBus.$on('cart-before-add', payload => calls.push(['cart-before-add', payload]))
    EventBus.$on('cart-after-delete', payload => calls.push(['cart-after-delete', payload]))
    const state = { cartItems: [] } as any
    const product = { sku: 'test', qty: 2 }

    cartMutations[cartMutationTypes.CART_ADD_ITEM](state, { product })
    cartMutations[cartMutationTypes.CART_DEL_ITEM](state, { product })

    expect(calls).toEqual([
      ['cart-before-add', { product: { sku: 'test', qty: 2 } }],
      ['cart-after-delete', { items: [] }]
    ])
  })

  it('preserves checkout component event arguments', () => {
    const listener = jest.fn()
    EventBus.$on('checkout-after-personalDetails', listener)
    const personalDetails = { emailAddress: 'customer@example.com' }
    const validation = { $invalid: false }

    PersonalDetails.methods.sendDataToCheckout.call({
      personalDetails,
      $v: validation
    })

    expect(listener).toHaveBeenCalledWith(personalDetails, validation)
  })

  it('preserves payment selection and place-order event chaining', () => {
    const store = {
      registerModule: jest.fn(),
      commit: jest.fn(),
      state: {
        'payment-backend-methods': {
          methods: [{ code: 'server-method', is_server_method: true }]
        }
      }
    }
    const placeOrder = jest.fn()
    EventBus.$on('checkout-do-placeOrder', placeOrder)

    PaymentBackendMethodsModule({ store } as any)
    EventBus.$emit('checkout-payment-method-changed', 'server-method')
    EventBus.$emit('checkout-before-placeOrder')

    expect(placeOrder).toHaveBeenCalledWith({})
  })

  it('preserves customization request instrumentation before transport', async () => {
    const beforeRequest = jest.fn()
    EventBus.$on(BEFORE_STORE_BACKEND_API_REQUEST, beforeRequest)
    ;(fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({
        result: {
          results: []
        }
      })
    })

    await saveOrderItemCustomizationsState([
      {
        id: 42,
        customization_state: {}
      }
    ] as any, 'customer-token')

    expect(beforeRequest).toHaveBeenCalledWith({
      url: expect.stringContaining('/customizations/order-items/states')
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
