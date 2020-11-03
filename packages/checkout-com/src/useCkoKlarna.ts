/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createPayment } from './payment';
import { ref } from '@vue/composition-api';
import { CkoPaymentType, getCurrentPaymentMethodPayload } from './helpers';

declare const document;
declare const Klarna;

const error = ref(null);

const useCkoKlarna = () => {
  const makePayment = async ({
    token,
    context,
    secure3d,
    savePaymentInstrument,
    reference = null,
    success_url = null,
    failure_url = null
  }) => {
    try {

      // const token = getTransactionToken();

      // if (!token) {
      //   throw new Error('There is no payment token');
      // }

      const payment = await createPayment(
        getCurrentPaymentMethodPayload(CkoPaymentType.KLARNA, {
          token,
          context_id: context,
          secure3d,
          reference,
          save_payment_instrument: savePaymentInstrument,
          success_url: success_url || `${window.location.origin}/cko/payment-success`,
          failure_url: failure_url || `${window.location.origin}/cko/payment-error`
        })
      );

      // removeTransactionToken();
      // if (![200, 202].includes(payment.status)) {
      //   throw new Error(payment.data.error_type);
      // }

      return payment;
    } catch (e) {
      // removeTransactionToken();
      console.log(e);
      error.value = e;
      return null;
    }
  };

  const initKlarnaForm = (apm: any, contextId: string) => {
    console.log(apm);
    const buyWithKlarna = document.getElementById('payment-method-klarna');
    const payWithKlarna = document.getElementById('pay-klarna');

    buyWithKlarna.addEventListener(
      'click',
      () => {
        Klarna.Payments.authorize(
          {
            instance_id: contextId
          },
          {},
          response => {
            console.log('klarna payments authorize', response);
            buyWithKlarna.classList.add('hidden');
            payWithKlarna.classList.remove('hidden');
            payWithKlarna.addEventListener('click', async () => {
              const payment = await makePayment({
                token: response.authorization_token,
                context: contextId,
                secure3d: true,
                savePaymentInstrument: false
              });
              console.log(payment, 'oo');
            });
          }
        );
      },
      false
    );

    Klarna.Payments.init({
      client_token: apm.metadata.details.client_token
    });

    Klarna.Payments.load(
      {
        container: '#klarna_container',
        payment_method_categories: apm.metadata.details.payment_method_category.map(cat => cat.identifier),
        instance_id: contextId
      },
      apm.metadata.session,
      function temp (response) {
        console.log('klarna payments load', response);
      }
    );
  };

  return {
    makePayment,
    initKlarnaForm
  };
};
export default useCkoKlarna;
