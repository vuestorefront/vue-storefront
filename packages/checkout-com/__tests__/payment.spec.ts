import { createContext, createPayment, getCustomerCards, removeSavedCard } from '../src/payment';

const publicKey = 'public key';
const ctApiUrl = 'https://webhook.com/api';
const ckoProxyUrl = 'https://proxy.com/api';
const currentChannel = 'en';

import axios from 'axios';
jest.mock('axios', () => ({
  post: jest.fn(),
  delete: jest.fn()
}));
jest.mock('@vue-storefront/checkout-com/src/configuration', () => ({
  getPublicKey: () => publicKey,
  getApiUrl: () => ctApiUrl,
  getCkoProxyUrl: () => ckoProxyUrl,
  getCurrentChannel: () => currentChannel
}));

describe('[checkout-com] payment', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createContext for guest', () => {

    const reference = {
      cartId: 15
    };

    createContext({ reference });

    expect(axios.post).toBeCalledWith(
      `${ctApiUrl}/contexts`,
      { reference },
      {
        crossDomain: true,
        headers: {
          authorization: publicKey
        }
      }
    );

  });

  it('createContext for customer', () => {

    const payload = {
      reference: 15,
      email: 'johny@gmail.com'
    };

    /*eslint-disable */
    const expectedPayload = {
      reference: payload.reference,
      customer_email: payload.email
    }
    /* eslint-enable */

    createContext(payload);

    expect(axios.post).toBeCalledWith(
      `${ctApiUrl}/contexts`,
      expectedPayload,
      {
        crossDomain: true,
        headers: {
          authorization: publicKey
        }
      }
    );

  });

  it('createPayment', () => {

    /*eslint-disable */
    const paymentPayload = {
      type: 'token',
      token: '123',
      context_id: '12',
      success_url: 'https://example.com/success',
      failure_url: 'https://example.com/failure',
      save_payment_instrument: true,
      '3ds': true
    }

    const expectedRequestPayload = {
      type: 'token',
      token: '123',
      context_id: '12',
      success_url: 'https://example.com/success',
      failure_url: 'https://example.com/failure',
      save_payment_instrument: true,
      '3ds': true
    }
    /* eslint-enable */

    createPayment(paymentPayload);

    expect(axios.post).toBeCalledWith(
      `${ctApiUrl}/payments`,
      expectedRequestPayload,
      {
        crossDomain: true,
        headers: {
          authorization: publicKey
        }
      }
    );

  });

  it('getCustomerCards', () => {

    /*eslint-disable */
    const payload = {
      customer_id: 15,
      channel: currentChannel
    };
    /* eslint-enable */

    getCustomerCards(payload);

    expect(axios.post).toBeCalledWith(
      `${ckoProxyUrl}/payment-instruments`,
      payload
    );

  });

  it('removeSavedCard', () => {

    /*eslint-disable */
    const customerData = {
      customer_id: 15,
      payment_instrument_id: 12,
      channel: currentChannel
    };
    /* eslint-enable */

    removeSavedCard(customerData);

    expect(axios.delete).toBeCalledWith(
      `${ckoProxyUrl}/payment-instruments/${customerData.customer_id}/${customerData.payment_instrument_id}/${customerData.channel}`
    );

  });

});
