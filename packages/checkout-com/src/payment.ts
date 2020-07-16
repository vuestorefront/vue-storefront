/* eslint-disable camelcase, @typescript-eslint/camelcase */
import axios from 'axios';
import { getPublicKey, getCkoWebhookUrl, getCkoProxyUrl } from '@vue-storefront/checkout-com/src/configuration';

const createOptions = () => ({
  crossDomain: true,
  headers: {
    authorization: getPublicKey()
  }
});

export const createContext = async ({ reference }) =>
  axios.post(`${getCkoWebhookUrl()}/contexts`, { reference }, createOptions());

export const createPayment = async ({
  type,
  token,
  context_id,
  success_url,
  failure_url,
  save_payment_instrument,
  secure3d
}) =>
  axios.post(
    `${getCkoWebhookUrl()}/payments`,
    {
      type,
      token,
      context_id,
      success_url,
      failure_url,
      save_payment_instrument,
      '3ds': secure3d
    },
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
