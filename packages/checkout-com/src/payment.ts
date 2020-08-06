/* eslint-disable camelcase, @typescript-eslint/camelcase */
import axios from 'axios';
import { getPublicKey, getCkoWebhookUrl, getCkoProxyUrl } from '@vue-storefront/checkout-com/src/configuration';
import { PaymentMethodPayload } from './helpers';

const createOptions = () => ({
  crossDomain: true,
  headers: {
    authorization: getPublicKey()
  }
});

export const createContext = async ({ reference, email = null }) =>
  axios.post(`${getCkoWebhookUrl()}/contexts`, {
    reference,
    ...(email ? { customer_email: email } : {})
  }, createOptions());

export const createPayment = async (payload: PaymentMethodPayload) =>
  axios.post(
    `${getCkoWebhookUrl()}/payments`,
    payload,
    createOptions()
  );

export const getCustomerCards = async ({ customer_id }) =>
  axios.post(
    `${getCkoProxyUrl()}/payment-instruments`,
    {
      customer_id
    }
  );

export const removeSavedCard = async ({ customer_id, payment_instrument_id }) =>
  axios.delete(
    `${getCkoProxyUrl()}/payment-instruments/${customer_id}/${payment_instrument_id}`
  );
