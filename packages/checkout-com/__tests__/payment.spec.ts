import { createContext, createPayment } from '../src/payment';

const publicKey = 'public key';
const ckoWebhookUrl = 'https://webhook.com/api';

import axios from 'axios';
jest.mock('axios', () => ({
  post: jest.fn()
}));
jest.mock('@vue-storefront/checkout-com/src/configuration', () => ({
  getPublicKey: () => publicKey,
  getCkoWebhookUrl: () => ckoWebhookUrl
}));

describe('[checkout-com] payment', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createContext', () => {

    const reference = {
      cartId: 15
    };

    createContext({ reference });

    expect(axios.post).toBeCalledWith(
      `${ckoWebhookUrl}/contexts`,
      { reference },
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
      context_id: 12,
      success_url: 'https://example.com/success',
      failure_url: 'https://example.com/failure',
      save_payment_instrument: true,
      secure3d: true,
      someFakeAttribute: '12312312321'
    }

    const expectedRequestPayload = {
      type: 'token',
      token: '123',
      context_id: 12,
      success_url: 'https://example.com/success',
      failure_url: 'https://example.com/failure',
      save_payment_instrument: true,
      '3ds': true
    }
    /* eslint-enable */

    createPayment(paymentPayload);

    expect(axios.post).toBeCalledWith(
      `${ckoWebhookUrl}/payments`,
      expectedRequestPayload,
      {
        crossDomain: true,
        headers: {
          authorization: publicKey
        }
      }
    );

  });

});
