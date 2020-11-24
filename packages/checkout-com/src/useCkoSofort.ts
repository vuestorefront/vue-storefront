/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext, createPayment } from './payment';
import { ref } from '@vue/composition-api';
import { CkoPaymentType, getCurrentPaymentMethodPayload } from './helpers';

const useCkoSofort = () => {
  const error = ref(null);

  const makePayment = async ({
    cartId,
    email,
    contextDataId = null,
    success_url = null,
    failure_url = null,
    reference = null
  }) => {
    try {
      let context;
      if (!contextDataId) {
        context = await createContext({ reference: cartId, email });
      }

      const payment = await createPayment(
        getCurrentPaymentMethodPayload(CkoPaymentType.SOFORT, {
          reference,
          context_id: contextDataId || context.data.id,
          success_url: success_url || `${window.location.origin}/cko/payment-success`,
          failure_url: failure_url || `${window.location.origin}/cko/payment-error`
        })
      );

      if (![200, 202].includes(payment.status)) {
        throw new Error(payment.data.error_type);
      }

      return payment;
    } catch (e) {
      error.value = e;
      return null;
    }
  };

  return {
    error,
    makePayment
  };
};
export default useCkoSofort;
