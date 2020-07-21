/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext, createPayment, getCustomerCards, removeSavedCard } from './payment';
import { ref, computed } from '@vue/composition-api';
import { getPublicKey, getFramesStyles, getTransactionTokenKey, Configuration, getFramesLocalization, getSaveInstrumentKey } from './configuration';
import { CKO_PAYMENT_TYPE, buildPaymentPayloadStrategies, PaymentPropetiesWithOptionalToken } from './helpers';

declare const Frames: any;

const savePaymentInstrument = ref(false);
const isCardValid = ref(false);
const error = ref(null);
const paymentMethod = ref(0);
const storedPaymentInstruments = ref([]);
const submitDisabled = computed(() => {
  if (paymentMethod.value === CKO_PAYMENT_TYPE.SAVED_CARD) {
    return false;
  }
  return !isCardValid.value;
});

const getTransactionToken = () => localStorage.getItem(getTransactionTokenKey());
const setTransactionToken = (token) => localStorage.setItem(getTransactionTokenKey(), token);
const removeTransactionToken = () => localStorage.removeItem(getTransactionTokenKey());

const setSavePaymentInstrument = (newSavePaymentInstrument: boolean) => {
  savePaymentInstrument.value = Boolean(newSavePaymentInstrument);
  localStorage.setItem(getSaveInstrumentKey(), JSON.stringify(newSavePaymentInstrument));
};
const loadSavePaymentInstrument = () => savePaymentInstrument.value = localStorage.getItem(getSaveInstrumentKey())
  ? JSON.parse(localStorage.getItem(getSaveInstrumentKey()))
  : false;

const setCurrentPaymentMethod = (newPaymentMethod: CKO_PAYMENT_TYPE) => paymentMethod.value = newPaymentMethod;
const getCurrentPaymentMethodPayload = (payload: PaymentPropetiesWithOptionalToken) => buildPaymentPayloadStrategies[paymentMethod.value](payload);

const useCkoCard = () => {
  const makePayment = async ({ cartId, email, contextDataId = null }) => {
    try {

      const token = getTransactionToken();

      if (!token) {
        throw new Error('There is no payment token');
      }

      let context;
      if (!contextDataId) {
        context = await createContext({ reference: cartId, email });
      }

      const payment = await createPayment(
        getCurrentPaymentMethodPayload({
          token,
          context_id: context.data.id,
          save_payment_instrument: paymentMethod.value === CKO_PAYMENT_TYPE.CREDIT_CARD && savePaymentInstrument.value,
          secure3d: true,
          success_url: `${window.location.origin}/cko/payment-success`,
          failure_url: `${window.location.origin}/cko/payment-error`
        })
      );

      removeTransactionToken();
      if (![200, 202].includes(payment.status)) {
        throw new Error(payment.data.error_type);
      }

      return payment;
    } catch (e) {
      removeTransactionToken();
      error.value = e;
      return null;
    }
  };

  const submitForm = async () => Frames.submitCard();

  const initCardForm = (params?: Omit<Configuration, 'publicKey'>) => {
    const localization = params?.frames?.localization || getFramesLocalization();
    loadSavePaymentInstrument();
    Frames.init({
      publicKey: getPublicKey(),
      style: params?.frames?.styles || getFramesStyles(),
      ...(localization ? { localization } : {}),
      cardValidationChanged: () => {
        isCardValid.value = Frames.isCardValid();
      },
      cardTokenized: async ({ token }) => {
        setCurrentPaymentMethod(CKO_PAYMENT_TYPE.CREDIT_CARD);
        setTransactionToken(token);
      },
      cardTokenizationFailed: (data) => {
        error.value = data;
        isCardValid.value = false;
      }
    });
  };

  const loadStoredPaymentInstruments = async (customerId: string) => {
    try {
      const { data } = await getCustomerCards({ customer_id: customerId });
      storedPaymentInstruments.value = data.payment_instruments;
    } catch (e) {
      error.value = e;
    }
  };

  const removePaymentInstrument = async (customerId: string, paymentInstrument: string) => {
    try {
      await removeSavedCard({ customer_id: customerId, payment_instrument_id: paymentInstrument });
      const { id: cardSrcId } = storedPaymentInstruments.value.find(card => card.payment_instrument_id === paymentInstrument);
      storedPaymentInstruments.value = storedPaymentInstruments.value.filter(instrument => instrument.payment_instrument_id !== paymentInstrument);
      if (cardSrcId === getTransactionToken()) {
        setCurrentPaymentMethod(CKO_PAYMENT_TYPE.CREDIT_CARD);
        removeTransactionToken();
      }
    } catch (e) {
      error.value = e;
    }
  };

  return {
    error,
    submitDisabled,
    submitForm,
    makePayment,
    initCardForm,
    setCurrentPaymentMethod,
    paymentMethod,
    loadStoredPaymentInstruments,
    setTransactionToken,
    storedPaymentInstruments,
    setSavePaymentInstrument,
    savePaymentInstrument,
    removePaymentInstrument
  };
};
export default useCkoCard;
