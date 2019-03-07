import Vue from 'vue'
import Vuex from 'vuex'

import { cartCacheHandlerFactory } from '../../../helpers/cartCacheHandler';
import { afterRegistration } from "../../../hooks/afterRegistration";
import Mock = jest.Mock;

Vue.use(Vuex);

jest.mock('../../../helpers/cartCacheHandler', () => ({ cartCacheHandlerFactory: jest.fn() }) );

Vue.prototype.$db = {
  cartsCollection: {
    setItem: jest.fn()
  }
};

describe('Cart afterRegistration', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hook dispatches load action on browser side', () => {
    const storeMock = {
      modules: {
        cart: {
          actions: {
            load: jest.fn()
          },
          namespaced: true
        }
      }
    };

    afterRegistration({ Vue, config: {}, store: new Vuex.Store(storeMock), isServer: false});

    expect(storeMock.modules.cart.actions.load).toBeCalled()
  });

  it ('hook subscribes to mutations with cartCacheHandler', () => {
    const store = new Vuex.Store({});
    const storeSpy = jest.spyOn(store,'subscribe');
    const cartCacheHandler = jest.fn();

    (<Mock> cartCacheHandlerFactory).mockReturnValueOnce(cartCacheHandler);

    afterRegistration({ Vue, config: {}, store, isServer: true });

    expect(storeSpy).toBeCalledWith(cartCacheHandler);
  });
});
