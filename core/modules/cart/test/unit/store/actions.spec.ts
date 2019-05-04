import Vue from 'vue'

import * as types from '../../../store/mutation-types';
import cartActions from '../../../store/actions';
import config from 'config';
import rootStore from '@vue-storefront/core/store';
import { sha3_224 } from 'js-sha3';
import { TaskQueue } from "../../../../../lib/sync";
import * as coreHelper from '@vue-storefront/core/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { onlineHelper } from '@vue-storefront/core/helpers';

jest.mock('@vue-storefront/core/store',() => ({
  dispatch: jest.fn(),
  state: {}
}));
jest.mock('config', () => ({}));
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('js-sha3',() => ({ sha3_224: jest.fn() }));
jest.mock('@vue-storefront/core/lib/multistore',() => ({
  currentStoreView: jest.fn(),
  localizedRoute: jest.fn()
}));
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {}),
    debug: jest.fn(() => () => {})
  }
}));
jest.mock('@vue-storefront/core/lib/sync', () => ({ TaskQueue: {
  execute: jest.fn()
}}));
jest.mock('@vue-storefront/core/app', () => ({ router: jest.fn() }));
jest.mock('@vue-storefront/core/lib/search/searchQuery', () => jest.fn());
jest.mock('@vue-storefront/core/helpers', () => ({
  get isServer() {
    return true
  },
  onlineHelper: {
    get isOnline() {
      return true
    }
  }
}));

Vue.prototype.$bus = {
  $emit: jest.fn()
};

describe('Cart actions', () => {

  const isServerSpy = jest.spyOn((coreHelper as any).default, 'isServer', 'get');
  const isOnlineSpy = jest.spyOn(onlineHelper, 'isOnline', 'get');

  beforeEach(() => {
    jest.clearAllMocks();
    (rootStore as any).state = {};
    Object.keys(config).forEach(function(key) { delete config[key]; });
  });

  it('serverTokenClear clears cart token', () => {
    const contextMock = {
      commit: jest.fn()
    };
    const wrapper = (actions: any) => actions.serverTokenClear(contextMock);

    wrapper(cartActions);

    expect(contextMock.commit).toBeCalledWith(types.CART_LOAD_CART_SERVER_TOKEN, null);
  });

  it('clear deletes all cart products and token', () => {
    const contextMock = {
      commit: jest.fn()
    };
    const wrapper = (actions: any) => actions.clear(contextMock);

    config.cart = { synchronize: false };

    wrapper(cartActions);

    expect(contextMock.commit).toBeCalledWith(types.CART_LOAD_CART, []);
    expect(contextMock.commit).toBeCalledWith(types.CART_LOAD_CART_SERVER_TOKEN, null);
  });

  it('clear dispatches creating a new cart on server with direct backend sync when its configured', () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };

    config.cart = { synchronize: true };
    config.orders = { directBackendSync: true };

    const wrapper = (actions: any) => actions.clear(contextMock);

    wrapper(cartActions);

    expect(contextMock.dispatch).toBeCalledWith('serverCreate', { guestCart: false});
  });

  it('clear dispatches creating a new cart on server with queuing when direct backend sync is not configured', () => {
    const contextMock = {
      commit: jest.fn(),
      dispatch: jest.fn()
    };

    config.cart = { synchronize: true };
    config.orders = { directBackendSync: false };

    const wrapper = (actions: any) => actions.clear(contextMock);

    wrapper(cartActions);

    expect(contextMock.dispatch).toBeCalledWith('serverCreate', { guestCart: true});
  });

  it('save dispatches cart save mutation', () => {
    const contextMock = {
      commit: jest.fn()
    };
    const wrapper = (actions: any) => actions.save(contextMock);

    wrapper(cartActions);

    expect(contextMock.commit).toBeCalledWith(types.CART_SAVE);
  });

  describe('serverPull', () => {

    it('pulls latest cart data and refreshes payment/shipping methods when there are products in cart', async () => {
      isOnlineSpy.mockReturnValueOnce(true);
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartItems: [],
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
          cartServerMethodsRefreshAt: 0,
        }
      };

      config.cart = { synchronize: true };
      (rootStore as any).state = {
        checkout: {
          shippingDetails: {
            country: 'pl'
          }
        }
      };

      const expectedState = {
        cartItems: [{sku: 'foo'}],
        cartServerToken: 'some-token',
        cartItemsHash: 'new-hash',
        cartServerPullAt: 1000003000,
        cartServerMethodsRefreshAt: 1000003000,
      };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => expectedState.cartServerPullAt);
      (sha3_224 as any).mockReturnValueOnce(expectedState.cartItemsHash);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => {
        contextMock.state.cartItems = contextMock.state.cartItems.concat(expectedState.cartItems);
        return Promise.resolve({})
      });

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
      expect(rootStore.dispatch).toBeCalledWith('cart/getPaymentMethods');
      expect(rootStore.dispatch).toBeCalledWith(
        'cart/getShippingMethods',
        { country_id: rootStore.state.checkout.shippingDetails.country }
      );
      expect(contextMock.state).toEqual(expectedState);
    });

    it('pulls shipping methods with default country if none is set in shipping details', async () => {
      isOnlineSpy.mockReturnValueOnce(true);
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartItems: [],
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
          cartServerMethodsRefreshAt: 0,
        }
      };

      config.cart = { synchronize: true };
      (rootStore as any).state = {
        checkout: {
          shippingDetails: { }
        }
      };

      const expectedState = {
        cartItems: [{sku: 'foo'}],
        cartItemsHash: 'new-hash',
        cartServerPullAt: 1000003000,
      };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => expectedState.cartServerPullAt);
      (sha3_224 as any).mockReturnValueOnce(expectedState.cartItemsHash);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => {
        contextMock.state.cartItems = contextMock.state.cartItems.concat(expectedState.cartItems);
        return Promise.resolve({})
      });
      (currentStoreView as jest.Mock).mockReturnValueOnce({ tax: { defaultCountry: 'us' } });

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      await wrapper(cartActions);

      expect(rootStore.dispatch).toBeCalledWith(
        'cart/getShippingMethods',
        { country_id: 'us' }
      );
    });

    it('doesn\'t update shipping methods if cart is empty', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartItems: [],
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
          cartServerMethodsRefreshAt: 0,
        }
      };

      config.cart = { synchronize: true };
      (rootStore as any).state = {
        checkout: {
          shippingDetails: {
            country: 'pl'
          }
        }
      };

      const expectedState = {
        cartItems: [],
        cartItemsHash: 'new-hash',
        cartServerPullAt: 1000003000,
      };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => expectedState.cartServerPullAt);
      (sha3_224 as any).mockReturnValueOnce(expectedState.cartItemsHash);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      await wrapper(cartActions);

      expect(rootStore.dispatch).not.toBeCalledWith(
        'cart/getShippingMethods',
        { country_id: 'us' }
      );
    });

    it('doesn\'t update payment methods if they were synced recently', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartItems: [],
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
          cartServerMethodsRefreshAt: 1000000000,
        }
      };

      config.cart = { synchronize: true };

      const expectedState = {
        cartItems: [],
        cartItemsHash: 'new-hash',
        cartServerPullAt: 1000003000,
      };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => expectedState.cartServerPullAt);
      (sha3_224 as any).mockReturnValueOnce(expectedState.cartItemsHash);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      await wrapper(cartActions);

      expect(rootStore.dispatch).not.toBeCalled();
    });

    it('doesn\'t update payment methods if they were synced recently', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartItems: [],
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
          cartServerMethodsRefreshAt: 1000000000,
        }
      };

      config.cart = { synchronize: true };

      const expectedState = {
        cartItems: [],
        cartItemsHash: 'new-hash',
        cartServerPullAt: 1000003000,
      };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => expectedState.cartServerPullAt);
      (sha3_224 as any).mockReturnValueOnce(expectedState.cartItemsHash);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      await wrapper(cartActions);

      expect(rootStore.dispatch).not.toBeCalled();
    });

    it('pulls latest cart data and even when the cart was updated recently but the hash has changed' +
      '(so cart items or token wer modified)', () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartItems: [],
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
          cartServerMethodsRefreshAt: 1000000000,
        }
      };

      config.cart = { synchronize: true };

      const expectedState = {
        cartItems: [],
        cartItemsHash: 'new-hash',
        cartServerPullAt: 1000000050,
      };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => expectedState.cartServerPullAt);
      (sha3_224 as any).mockReturnValueOnce(expectedState.cartItemsHash);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
    });

    it('performs a cart update request with dry run and forcing client state if its configured to do so', () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartItems: [],
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
          cartServerMethodsRefreshAt: 1000000000,
        }
      };

      config.cart = { synchronize: true };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000003000);
      (sha3_224 as any).mockReturnValueOnce(contextMock.state.cartItemsHash);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverPull(contextMock, { forceClientState: true, dryRun: true });

      wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalledWith(expect.objectContaining({ dry_run: true, force_client_state: true, }));
    });

    it('does not do anything if last cart sync was recently and the cart state hasn\'t been changed since then', () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: 'some-token',
          cartItemsHash: 'some-sha-hash',
          cartServerPullAt: 1000000000,
        }
      };

      config.cart = { synchronize: true };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000000050);
      (sha3_224 as any).mockReturnValueOnce(contextMock.state.cartItemsHash);

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });

    it('does not do anything if synchronization is off', () => {
      const contextMock = {
        dispatch: jest.fn(),
      };

      config.cart = { synchronize: false };

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });

    it('does not do anything in SSR environment', () => {
      const contextMock = {
        dispatch: jest.fn()
      };

      config.cart = { synchronize: true };

      const wrapper = (actions: any) => actions.serverPull(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });
  });

  describe('serverTotals', () => {

    it('pulls latest totals from server', async () => {
      const contextMock = {
        state: {
          cartServerToken: 'some-token',
          cartServerTotalsAt: 1000000000,
        }
      };

      config.cart = { synchronize_totals: true };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000003000);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverTotals(contextMock, {});

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
    });

    it('pulls latest totals from server forcing client state if it\'s configured to do so', async () => {
      const contextMock = {
        state: {
          cartServerToken: 'some-token',
          cartServerTotalsAt: 1000000000,
        }
      };

      config.cart = { synchronize_totals: true };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000003000);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverTotals(contextMock, { forceClientState: true });

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalledWith(expect.objectContaining({ force_client_state: true }))
    });

    it('does not do anything if last totals sync was done recently', () => {
      const contextMock = {
        state: {
          cartServerToken: 'some-token',
          cartServerTotalsAt: 1000000000,
        }
      };

      config.cart = { synchronize_totals: true };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000000050);

      const wrapper = (actions: any) => actions.serverTotals(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });

    it('does not do anything if totals synchronization is off', () => {
      const contextMock = {
        state: {
          cartServerToken: 'some-token'
        }
      };

      config.cart = { synchronize_totals: false };

      const wrapper = (actions: any) => actions.serverTotals(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });

    it('does not do anything in SSR environment', () => {
      const contextMock = {};

      config.cart = { synchronize_totals: true };

      const wrapper = (actions: any) => actions.serverTotals(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });
  });

  describe('serverCreate', () => {

    it('requests to backend for creation of a new cart', async () => {
      const contextMock = {
        state: {
          cartServerCreatedAt: 1000000000,
        }
      };

      config.cart = { synchronize: true };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000003000);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverCreate(contextMock, {});

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
    });

    it('requests to backend for creation of guest cart', async () => {
      const contextMock = {
        state: {
          cartServerCreatedAt: 1000000000,
        }
      };

      config.cart = {
        synchronize: true,
        create_endpoint: 'http://example.url/guest-cart/{{token}}'
      };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000003000);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverCreate(contextMock, { guestCart: true });

      await wrapper(cartActions);
      expect(TaskQueue.execute).toBeCalledWith(expect.objectContaining({ url: 'http://example.url/guest-cart/' }))
    });

    it('does not do anything if last totals sync was done recently', () => {
      const contextMock = {
        state: {
          cartServerCreatedAt: 1000000000,
        }
      };

      config.cart = { synchronize: true };

      isServerSpy.mockReturnValueOnce(false);
      Date.now = jest.fn(() => 1000000050);

      const wrapper = (actions: any) => actions.serverCreate(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });

    it('does not do anything if totals synchronization is off', () => {
      const contextMock = {};

      config.cart = { synchronize: false };

      const wrapper = (actions: any) => actions.serverCreate(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });

    it('does not do anything in SSR environment', () => {
      const contextMock = {};

      config.cart = { synchronize: true };

      const wrapper = (actions: any) => actions.serverCreate(contextMock, {});

      wrapper(cartActions);

      expect(TaskQueue.execute).not.toBeCalled();
    });
  });

  describe('serverUpdateItem', () => {

    it('sends an item update request to backend server and updates totals', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
          cartItems: [{sku: '123'}]
        }
      };

      config.cart = {
        synchronize_totals: true,
        updateitem_endpoint: 'http://endpoint.com/cart/update-item'
      };

      const cartItemMock = {
        sku: '123',
        quoteId: 'SOME-QUOTE-ID'
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverUpdateItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
      expect(contextMock.dispatch).toBeCalledWith('refreshTotals')
    });

    it('sends an item update request to backend server and sets its quoteId to cart token, if none has been set before', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
        }
      };

      config.cart = {
        synchronize_totals: false,
        updateitem_endpoint: 'http://endpoint.com/cart/update-item'
      };

      const cartItemMock = {
        sku: '123'
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverUpdateItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalledWith(expect.objectContaining({
        payload: {
          body: '{"cartItem":{"sku":"123","quoteId":"SOME-TOKEN"}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'cors'
        }
      }));
    });

    it('sends an item update request but doesn\'t call refresh totals if the cart after update is empty', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
          cartItems: []
        }
      };

      config.cart = {
        synchronize_totals: true,
        updateitem_endpoint: 'http://endpoint.com/cart/update-item'
      };

      const cartItemMock = {
        sku: '123',
        quantity: 0
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverUpdateItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
      expect(contextMock.dispatch).not.toBeCalled();
    });

    it('sends an item update request but doesn\'t call refresh totals if totals sync is configured off', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
          cartItems: [{sku: '123'}]
        }
      };

      config.cart = {
        synchronize_totals: false,
        updateitem_endpoint: 'http://endpoint.com/cart/update-item'
      };

      const cartItemMock = {
        sku: '123'
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverUpdateItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
      expect(contextMock.dispatch).not.toBeCalled();
    });
  });

  describe('serverDeleteItem', () => {

    it('sends a delete item from cart request to backend server and updates totals', async () => {
      isOnlineSpy.mockReturnValueOnce(true);
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
          cartItems: [{sku: '123'}]
        }
      };

      config.cart = {
        synchronize_totals: true,
        deleteitem_endpoint: 'http://endpoint.com/cart/delete-item'
      };

      const cartItemMock = {
        sku: '123',
        quoteId: 'SOME-QUOTE-ID'
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverDeleteItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
      expect(contextMock.dispatch).toBeCalledWith('refreshTotals')
    });

    it('sends a delete item from cart request to backend server and sets its quoteId to cart token, ' +
      'if none has been set before', async () => {
      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
        }
      };

      config.cart = {
        synchronize_totals: false,
        deleteitem_endpoint: 'http://endpoint.com/cart/delete-item'
      };

      const cartItemMock = {
        sku: '123'
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => Promise.resolve({}));

      const wrapper = (actions: any) => actions.serverDeleteItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalledWith(expect.objectContaining({
        payload: {
          body: '{"cartItem":{"sku":"123","quoteId":"SOME-TOKEN"}}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'cors'
        }
      }));
    });

    it('sends a delete item from cart request but doesn\'t call refresh totals if the cart after update is empty', async () => {
      const cartItemMock = {
        sku: '123',
      };

      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
          cartItems: [cartItemMock]
        }
      };

      config.cart = {
        synchronize_totals: true,
        deleteitem_endpoint: 'http://endpoint.com/cart/delete-item'
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => {
        contextMock.state.cartItems = [];
        return Promise.resolve({});
      });

      const wrapper = (actions: any) => actions.serverDeleteItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
      expect(contextMock.dispatch).not.toBeCalled();
    });

    it('sends a delete item from cart request but doesn\'t call refresh totals if totals sync is configured off', async () => {
      const cartItemMock = {
        sku: '123'
      };

      const contextMock = {
        dispatch: jest.fn(),
        state: {
          cartServerToken: "SOME-TOKEN",
          cartItems: [cartItemMock]
        }
      };

      config.cart = {
        synchronize_totals: false,
        deleteitem_endpoint: 'http://endpoint.com/cart/delete-item'
      };

      isServerSpy.mockReturnValueOnce(false);
      (TaskQueue.execute as jest.Mock).mockImplementationOnce(() => {
        contextMock.state.cartItems = [];
        return Promise.resolve({});
      });

      const wrapper = (actions: any) => actions.serverDeleteItem(contextMock, cartItemMock);

      await wrapper(cartActions);

      expect(TaskQueue.execute).toBeCalled();
      expect(contextMock.dispatch).not.toBeCalled();
    });
  });
});
