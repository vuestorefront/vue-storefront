import Vue from 'vue'
import Vuex from 'vuex'

import * as types from '../../../store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'

const StorageManager = {
  cart: {
    setItem: jest.fn()
  },
  get (key) {
    return this[key]
  },
  clear () {
    return new Promise<void>((resolve, reject) => {
      resolve()
    })
  }
};
const cartCacheHandlerPlugin = require('../../../helpers/cartCacheHandler').cartCacheHandlerPlugin

jest.mock('@vue-storefront/core/lib/storage-manager', () => ({ StorageManager }))
jest.mock('@vue-storefront/core/helpers', () => ({
  isServer: () => false
}));
jest.mock('@vue-storefront/core/app', () => ({ createApp: jest.fn() }))
jest.mock('@vue-storefront/i18n', () => ({ loadLanguageAsync: jest.fn() }))

jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    error: () => () => {}
  }
}))

Vue.use(Vuex);

describe('Cart afterRegistration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    types.CART_LOAD_CART,
    types.CART_ADD_ITEM,
    types.CART_DEL_ITEM,
    types.CART_UPD_ITEM,
    types.CART_UPD_ITEM_PROPS
  ])('handler populates cart cache on mutation %s that modifies cart items', async (mutationType) => {
    const stateMock = {
      cart: {
        cartItems: [{}]
      }
    };

    StorageManager.get('cart').setItem.mockImplementationOnce(() => Promise.resolve('foo'));

    await cartCacheHandlerPlugin({ type: mutationType }, stateMock);

    expect(StorageManager.get('cart').setItem)
      .toBeCalledWith('current-cart', stateMock.cart.cartItems);
  });

  it('handler logs error when populating cart cache with items fails', async () => {
    const stateMock = {
      cart: {
        cartItems: [{}]
      }
    };

    const consoleErrorSpy = jest.spyOn(Logger, 'error');

    StorageManager.get('cart').setItem.mockImplementationOnce(() => Promise.reject('foo'));

    await cartCacheHandlerPlugin({ type: types.CART_LOAD_CART }, stateMock);

    expect(consoleErrorSpy).toBeCalled();
  });

  it('hook updates cart token in cache on mutation changing cart token', async () => {
    const stateMock = {
      cart: {
        cartServerToken: 'token'
      }
    };

    StorageManager.get('cart').setItem.mockImplementationOnce(() => Promise.resolve('foo'));

    await cartCacheHandlerPlugin({ type: types.CART_LOAD_CART_SERVER_TOKEN }, stateMock);

    expect(StorageManager.get('cart').setItem)
      .toBeCalledWith('current-cart-token', stateMock.cart.cartServerToken);
  });

  it('handler logs error when changing cached token fails', async () => {
    const stateMock = {
      cart: {
        cartServerToken: 'token'
      }
    };

    const consoleErrorSpy = jest.spyOn(Logger, 'error');

    StorageManager.get('cart').setItem.mockImplementationOnce(() => Promise.reject('foo'));

    await cartCacheHandlerPlugin({ type: types.CART_LOAD_CART_SERVER_TOKEN }, stateMock);

    expect(consoleErrorSpy).toBeCalled();
  });

  it('handler ignores mutation not related to cart cache', async () => {
    const stateMock = {
      cart: {
        cartServerToken: 'token'
      }
    };

    const consoleErrorSpy = jest.spyOn(Logger, 'error');

    StorageManager.get('cart').setItem.mockImplementationOnce(() => Promise.reject('foo'));

    await cartCacheHandlerPlugin({ type: 'bar' }, stateMock);

    expect(consoleErrorSpy).not.toBeCalled();
  });
});
