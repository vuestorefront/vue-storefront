/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createPayment } from './payment';
import { ref } from '@vue/composition-api';
import { CkoPaymentType, getCurrentPaymentMethodPayload, getTransactionToken, removeTransactionToken, setTransactionToken } from './helpers';
import { KlarnaConfiguration, getKlarnaContainerSelector, getKlarnaOnMounted } from './configuration';

declare const document;
declare const Klarna;

const error = ref(null);

const useCkoKlarna = () => {
  const makePayment = async ({
    contextDataId,
    secure3d,
    savePaymentInstrument,
    reference = null,
    success_url = null,
    failure_url = null
  }) => {
    try {
      const token = getTransactionToken();

      if (!token) {
        throw new Error('There is no payment token');
      }

      const payment = await createPayment(
        getCurrentPaymentMethodPayload(CkoPaymentType.KLARNA, {
          token,
          context_id: contextDataId,
          secure3d,
          reference,
          save_payment_instrument: savePaymentInstrument,
          success_url: success_url || `${window.location.origin}/cko/payment-success`,
          failure_url: failure_url || `${window.location.origin}/cko/payment-error`
        })
      );

      removeTransactionToken();
      if (![200, 202].includes(payment.status)) {
        throw new Error(payment.data.error_type);
      }

      return payment;
    } catch (e) {
      removeTransactionToken();
      console.log(e);
      error.value = e;
      return null;
    }
  };

  const submitForm = (contextId: string) => new Promise((resolve, reject) => {
    try {
      Klarna.Payments.authorize(
        {
          instance_id: contextId
        },
        {},
        response => {
          setTransactionToken(response.authorization_token);
          resolve(response);
        }
      );
    } catch (err) {
      reject(err);
    }
  });

  const initKlarnaForm = (klarnaParams: KlarnaConfiguration, apm: any, contextId: string) => {
    Klarna.Payments.init({
      client_token: apm.metadata.details.client_token
    });

    Klarna.Payments.load(
      {
        container: klarnaParams?.containerSelector || getKlarnaContainerSelector(),
        payment_method_categories: apm.metadata.details.payment_method_category.map(cat => cat.identifier),
        instance_id: contextId
      },
      apm.metadata.session,
      klarnaParams?.mounted || getKlarnaOnMounted()
    );
  };

  return {
    makePayment,
    initKlarnaForm,
    submitForm,
    error
  };
};
export default useCkoKlarna;
