/* eslint-disable camelcase, @typescript-eslint/camelcase */
import axios from 'axios';
import { getPublicKey, getCkoWebhookUrl } from '@vue-storefront/checkout-com/src/configuration';

declare const Frames: any;

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
