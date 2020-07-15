/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext, createPayment } from './payment';
import { ref, onMounted } from '@vue/composition-api';
import { getPublicKey, getStyles, getCardTokenKey } from './configuration';

declare const Frames: any;

const submitDisabled = ref(false);
const error = ref(null);

const getCardToken = () => localStorage.getItem(getCardTokenKey());
const setCardToken = (token) => localStorage.setItem(getCardTokenKey(), token);
const removeCardToken = () => localStorage.removeItem(getCardTokenKey());

const useCkoCard = () => {
  const makePayment = async ({ cartId }) => {
    try {

      const token = getCardToken();

      if (!token) {
        throw new Error('There is no payment token');
      }

      const context = await createContext({ reference: cartId });
      const payment = await createPayment({
        type: 'token',
        token,
        context_id: context.data.id,
        save_payment_instrument: true,
        secure3d: true,
        success_url: `${window.location.origin}/cko/payment-success`,
        failure_url: `${window.location.origin}/cko/payment-error`
      });

      removeCardToken();
      if (![200, 202].includes(payment.status)) {
        throw new Error(payment.data.error_type);
      }

      return payment;
    } catch (e) {
      removeCardToken();
      error.value = e;
      return null;
    }
  };

  const submitForm = async () => Frames.submitCard();

  const initForm = () => {
    submitDisabled.value = true;
    onMounted(() => Frames.init({
      publicKey: getPublicKey(),
      style: getStyles(),
      cardValidationChanged: () => {
        submitDisabled.value = !Frames.isCardValid();
      },
      cardTokenized: async ({ token }) => {
        setCardToken(token);
      },
      cardTokenizationFailed: (data) => {
        error.value = data;
        submitDisabled.value = false;
      }
    }));
  };

  return {
    error,
    submitForm,
    submitDisabled,
    makePayment,
    initForm
  };
};
export default useCkoCard;
