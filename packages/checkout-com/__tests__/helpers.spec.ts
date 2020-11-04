import {
  getCurrentPaymentMethodPayload,
  CkoPaymentType,
  getTransactionToken,
  setTransactionToken,
  removeTransactionToken
} from '../src/helpers';

const getItemValue = 'vxbcyoodgfdg';

const sessionStorageMock = {
  removeItem: jest.fn(),
  getItem: jest.fn(() => getItemValue),
  setItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 1
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

const transactionKey = 'adasdascxvbxcvjhdfgfhdfg';

jest.mock('../src/configuration.ts', () => ({
  getTransactionTokenKey: jest.fn(() => transactionKey)
}));

import { getTransactionTokenKey } from '../src/configuration';

describe('[checkout-com] helpers', () => {

  it('getTransactionToken', () => {
    const value = getTransactionToken();

    expect(value).toBe(getItemValue);
    expect(getTransactionTokenKey).toHaveBeenCalled();
    expect(sessionStorageMock.getItem).toHaveBeenCalledWith(transactionKey);
  });

  it('setTransactionToken', () => {
    const value = 123;
    setTransactionToken(value);

    expect(sessionStorageMock.setItem).toHaveBeenCalledWith(transactionKey, value);
  });

  it('removeTransactionToken', () => {
    removeTransactionToken();

    expect(sessionStorageMock.removeItem).toHaveBeenCalledWith(transactionKey);
  });

  it('builds payment payload for credit card', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token'
    };

    const expectedPayload = {
      context_id: '123',
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token',
      type: 'token'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.CREDIT_CARD, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('builds payment payload for saved card', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: true,
      cvv: 1234,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token'
    };

    const expectedPayload = {
      context_id: '123',
      save_payment_instrument: true,
      cvv: 1234,
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token',
      type: 'id'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.SAVED_CARD, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('builds payment payload for klarna', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token'
    };

    const expectedPayload = {
      context_id: '123',
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      token: 'super-token',
      type: 'klarna'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.KLARNA, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('builds payment payload for paypal', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: true,
      success_url: 'aa',
      failure_url: 'bb',
      reference: 'zyxxzxz'
    };

    const expectedPayload = {
      context_id: '123',
      '3ds': true,
      success_url: 'aa',
      failure_url: 'bb',
      type: 'paypal',
      reference: 'zyxxzxz'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.PAYPAL, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

  it('does not add falsy by default attributes', () => {

    /*eslint-disable */
    const rawPayload = {
      context_id: '123',
      save_payment_instrument: false,
      secure3d: false,
      success_url: '',
      failure_url: ''
    };

    const expectedPayload = {
      context_id: '123',
      type: 'paypal'
    };
    /* eslint-enable */

    const builtPayload = getCurrentPaymentMethodPayload(CkoPaymentType.PAYPAL, rawPayload);

    expect(builtPayload).toEqual(expectedPayload);

  });

});
