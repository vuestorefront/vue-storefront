/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext, createPayment } from './payment';
import { ref } from '@vue/composition-api';
import { getPublicKey, getStyles, getCardTokenKey } from './configuration';

declare const Frames: any;

const cardToken = ref('');
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
        success_url: `${window.location.origin}/cko/payment-success`,
        failure_url: `${window.location.origin}/cko/payment-error`
      });

      if (![200, 202].includes(payment.status)) {
        error.value = payment.data.error_type;
        return null;
      }

      localStorage.removeItem(getCardTokenKey());
      return payment;
    } catch (e) {
      error.value = e;
      localStorage.removeItem(getCardTokenKey());
      return null;
    }
  };

  const submitForm = async () => Frames.submitCard();

  const initForm = () => {
    Frames.init({
      publicKey: getPublicKey(),
      style: getStyles(),
      cardValidationChanged: () => {
        submitDisabled.value = !Frames.isCardValid();
      },
      cardTokenized: async ({ token }) => {
        cardToken.value = token;
        localStorage.setItem(getCardTokenKey(), token);
      },
      cardTokenizationFailed: (data) => {
        error.value = data;
        submitDisabled.value = false;
      }
    });
  };

  const loadCardFromStorage = () => {
    const storeTokenizedCard = localStorage.getItem(getCardTokenKey());
    if (!cardToken.value && storeTokenizedCard) {
      cardToken.value = storeTokenizedCard;
      submitDisabled.value = false;
    }
  };

  return {
    error,
    cardToken,
    submitForm,
    submitDisabled,
    makePayment,
    initForm,
    loadCardFromStorage
  };
};

export default useCkoCard;
