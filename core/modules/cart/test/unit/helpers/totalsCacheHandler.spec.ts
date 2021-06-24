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
const totalsCacheHandlerPlugin = require('../../../helpers/totalsCacheHandler').totalsCacheHandlerPlugin

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

  it('handler populates cart cache on mutation CART_UPD_TOTALS that modifies totals', async () => {
    const stateMock = {
      cart: {
        platformTotalSegments: 1,
        platformTotals: 2
      }
    };

    StorageManager.get('cart').setItem.mockImplementationOnce(() => Promise.resolve('foo'));

    await totalsCacheHandlerPlugin({ type: types.CART_UPD_TOTALS }, stateMock);

    expect(StorageManager.get('cart').setItem)
      .toBeCalledWith('current-totals', {
        platformTotalSegments: 1,
        platformTotals: 2
      });
  });

  it('handler logs error when populating cart cache with items fails', async () => {
    const stateMock = {
      cart: {
        cartItems: [{}]
      }
    };

    const consoleErrorSpy = jest.spyOn(Logger, 'error');

    StorageManager.get('cart').setItem.mockImplementationOnce(() => Promise.reject('foo'));

    await totalsCacheHandlerPlugin({ type: types.CART_UPD_TOTALS }, stateMock);

    expect(consoleErrorSpy).toBeCalled();
  });

  it('nothing happens for mutation different than CART_UPD_TOTALS', async () => {
    const stateMock = {
      cart: {
        cartItems: [{}]
      }
    };

    const consoleErrorSpy = jest.spyOn(Logger, 'error');
    const storageManagerSpy = jest.spyOn(StorageManager.get('cart'), 'setItem');

    await totalsCacheHandlerPlugin({ type: 'abc' }, stateMock);

    expect(consoleErrorSpy).not.toBeCalled();
    expect(storageManagerSpy).not.toBeCalled();
  });
});
