/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext, createPayment, getCustomerCards, removeSavedCard } from './payment';
import { Ref, ref, computed } from '@vue/composition-api';
import { getPublicKey, getFramesStyles, CardConfiguration, getFramesLocalization } from './configuration';
import { CkoPaymentType, getCurrentPaymentMethodPayload, PaymentInstrument } from './helpers';

declare const Frames: any;

const isCardValid = ref(false);
const error = ref(null);
const storedPaymentInstruments = ref<PaymentInstrument[]>([]);

const useCkoCard = (selectedPaymentMethod: Ref<CkoPaymentType>) => {
  const submitDisabled = computed(() => selectedPaymentMethod.value === CkoPaymentType.CREDIT_CARD && !isCardValid.value);
  const cardToken = ref(null);

  const makePayment = async ({
    cartId,
    email,
    secure3d,
    contextDataId = null,
    savePaymentInstrument = false,
    success_url = null,
    failure_url = null
  }) => {
    try {

      if (!cardToken.value) {
        throw new Error('There is no payment token');
      }

      let context;
      if (!contextDataId) {
        context = await createContext({ reference: cartId, email });
      }

      const payment = await createPayment(
        getCurrentPaymentMethodPayload(selectedPaymentMethod.value, {
          token: cardToken.value,
          secure3d,
          context_id: contextDataId || context.data.id,
          save_payment_instrument: selectedPaymentMethod.value === CkoPaymentType.CREDIT_CARD && savePaymentInstrument,
          success_url: success_url || `${window.location.origin}/cko/payment-success`,
          failure_url: failure_url || `${window.location.origin}/cko/payment-error`
        })
      );

      if (![200, 202].includes(payment.status)) {
        throw new Error(payment.data.error_type);
      }
      cardToken.value = null;
      return payment;
    } catch (e) {
      error.value = e;
      cardToken.value = null;
      return null;
    }
  };

  const submitForm = async () => Frames.submitCard();

  const initCardForm = (cardParams?: CardConfiguration) => {
    const localization = cardParams?.localization || getFramesLocalization();
    Frames.init({
      publicKey: getPublicKey(),
      style: cardParams?.style || getFramesStyles(),
      ...(localization ? { localization } : {}),
      cardValidationChanged: () => {
        isCardValid.value = Frames.isCardValid();
      },
      cardTokenized: async ({ token }) => {
        cardToken.value = token;
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
      if (cardSrcId === cardToken.value) {
        selectedPaymentMethod.value = CkoPaymentType.CREDIT_CARD;
        cardToken.value = null;
      }
    } catch (e) {
      error.value = e;
    }
  };

  const setPaymentInstrument = (token: string) => {
    cardToken.value = token;
    selectedPaymentMethod.value = CkoPaymentType.SAVED_CARD;
  };

  return {
    error,
    submitDisabled,
    storedPaymentInstruments,
    selectedCardPaymentMethod: computed(() => selectedPaymentMethod.value),
    cardToken: computed(() => cardToken.value),
    submitForm,
    makePayment,
    initCardForm,
    loadStoredPaymentInstruments,
    removePaymentInstrument,
    setPaymentInstrument
  };
};
export default useCkoCard;
