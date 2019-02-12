import Vue from 'vue'

import * as types from "../../../store/mutation-types";
import cartActions from '../../../store/actions';

jest.mock('@vue-storefront/store',() => ({}));
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('js-sha3',() => ({ sha3_224: jest.fn() }));
jest.mock('@vue-storefront/core/lib/multistore',() => ({
  currentStoreView: jest.fn(),
  localizedRoute: jest.fn()
}));
jest.mock('@vue-storefront/core/lib/logger', () => ({ Logger: jest.fn() }));
jest.mock('@vue-storefront/core/lib/sync', () => ({ TaskQueue: jest.fn() }));
jest.mock('@vue-storefront/core/app', () => ({ router: jest.fn() }));
jest.mock('@vue-storefront/core/lib/search/searchQuery', () => jest.fn());

Vue.prototype.$bus = {
  $emit: jest.fn()
};

describe('Cart actions', () => {

  beforeEach(() => {
    jest.clearAllMocks();
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
    const wrapper = (actions: any) => actions.serverTokenClear(contextMock);

    wrapper(cartActions);

    expect(contextMock.commit).toBeCalledWith(types.CART_LOAD_CART_SERVER_TOKEN, null);
  });
});
