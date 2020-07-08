/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext, createPayment } from './payment';
import { onMounted, ref } from '@vue/composition-api';
import { getPublicKey, getStyles } from './configuration';

declare const Frames: any;

const cardToken = ref(null);
const submitDisabled = ref(true);
const error = ref(null);

const useCkoCard = () => {
  const makePayment = async ({ cartId }) => {
    try {
      const context = await createContext({ reference: cartId });
      const payment = await createPayment({
        type: 'token',
        token: cardToken.value,
        context_id: context.data.id,
        save_payment_instrument: true,
        secure3d: true,
        success_url: 'https://example.com/3ds-success.html',
        failure_url: 'https://example.com/3ds-error.html'
      });

      if (![200, 202].includes(payment.status)) {
        error.value = payment.data.error_type;
        return null;
      }

      return payment;
    } catch (e) {
      error.value = e;
      return null;
    }
  };

  const submitForm = async () => Frames.submitCard();

  onMounted(() => {
    Frames.init({
      publicKey: getPublicKey(),
      style: getStyles(),
      cardValidationChanged: () => {
        submitDisabled.value = !Frames.isCardValid();
      },
      cardTokenized: async ({ token }) => {
        cardToken.value = token;
      },
      cardTokenizationFailed: (data) => {
        error.value = data;
        submitDisabled.value = false;
      }
    });
  });

  return {
    error,
    cardToken,
    submitForm,
    submitDisabled,
    makePayment
  };
};

export default useCkoCard;
