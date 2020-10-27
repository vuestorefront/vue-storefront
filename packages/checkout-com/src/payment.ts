/* eslint-disable camelcase, @typescript-eslint/camelcase */
import axios from 'axios';
import { getPublicKey, getApiUrl, getCkoProxyUrl, getCurrentChannel } from '@vue-storefront/checkout-com/src/configuration';
import { PaymentMethodPayload } from './helpers';

const createOptions = () => ({
  crossDomain: true,
  headers: {
    authorization: getPublicKey()
  }
});

export const createContext = async ({ reference, email = null }) =>
  axios.post(`${getApiUrl()}/api/contexts`, {
    reference,
    ...(email ? { customer_email: email } : {})
  }, createOptions());

export const createPayment = async (payload: PaymentMethodPayload) =>
  axios.post(
    `${getApiUrl()}/api/payments`,
    payload,
    createOptions()
  );

export const getCustomerCards = async ({ customer_id }) =>
  axios.post(
    `${getCkoProxyUrl()}/payment-instruments`,
    {
      customer_id,
      channel: getCurrentChannel()
    }
  );

export const removeSavedCard = async ({ customer_id, payment_instrument_id }) =>
  axios.delete(
    `${getCkoProxyUrl()}/payment-instruments/${customer_id}/${payment_instrument_id}/${getCurrentChannel()}`
  );
