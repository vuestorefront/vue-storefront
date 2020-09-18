/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext } from './payment';
import { getSaveInstrumentKey, CardConfiguration } from './configuration';
import { ref, computed } from '@vue/composition-api';
import { CkoPaymentType } from './helpers';
import useCkoCard from './useCkoCard';
import useCkoPaypal from './useCkoPaypal';

const error = ref(null);
const availableMethods = ref([]);
const contextId = ref<string>(null);

interface PaymentMethods {
  card?: boolean;
  klarna?: boolean;
  paypal?: boolean;
}

interface PaymentMethodsConfig {
  card?: CardConfiguration;
  klarna?: any;
  paypal?: any;
}

const selectedPaymentMethod = ref(CkoPaymentType.NOT_SELECTED);

const setSavePaymentInstrument = (newSavePaymentInstrument: boolean) => {
  localStorage.setItem(getSaveInstrumentKey(), JSON.stringify(newSavePaymentInstrument));
};
const loadSavePaymentInstrument = (): boolean => {
  const stringifiedValue = localStorage.getItem(getSaveInstrumentKey());
  return stringifiedValue ? JSON.parse(stringifiedValue) : false;
};

const useCko = () => {
  const {
    initCardForm,
    makePayment: makeCardPayment,
    error: cardError,
    submitForm: submitCardForm,
    setPaymentInstrument,
    removePaymentInstrument,
    loadStoredPaymentInstruments,
    storedPaymentInstruments,
    submitDisabled
  } = useCkoCard(selectedPaymentMethod);

  const {
    makePayment: makePaypalPayment,
    error: paypalError
  } = useCkoPaypal();

  const loadAvailableMethods = async (reference, email?) => {
    try {
      const response = await createContext({ reference, email });
      availableMethods.value = [
        ...response.data.apms,
        { name: 'card' }
      ];
      contextId.value = response.data.id;
      return response.data;
    } catch (e) {
      error.value = e;
      return null;
    }
  };

  const initForm = (initMethods: PaymentMethods = null, config: PaymentMethodsConfig = {}) => {
    if (initMethods && Object.keys(initMethods).length === 0) {
      return;
    }
    const hasSpecifiedMethods = initMethods && Object.keys(initMethods).length > 0;
    for (const { name } of availableMethods.value) {
      if (!hasSpecifiedMethods || initMethods[name]) {
        const methodConfig = config[name];
        switch (name) {
          case 'card':
            initCardForm(methodConfig);
            break;
        }
      }
    }
  };

  const makePayment = async ({
    cartId = null,
    email = null,
    contextDataId = null,
    success_url = null,
    failure_url = null,
    secure3d = true
  } = {}) => {
    if (!selectedPaymentMethod.value) {
      error.value = new Error('Payment method not selected');
      return;
    }

    let finalizeTransactionFunction;
    let localError;

    if ([CkoPaymentType.CREDIT_CARD, CkoPaymentType.SAVED_CARD].includes(selectedPaymentMethod.value)) {
      finalizeTransactionFunction = makeCardPayment;
      localError = cardError;
    } else if (selectedPaymentMethod.value === CkoPaymentType.PAYPAL) {
      finalizeTransactionFunction = makePaypalPayment;
      localError = paypalError;
    } else {
      error.value = new Error('Not supported payment method');
      return;
    }

    const response = await finalizeTransactionFunction({
      cartId,
      email,
      success_url,
      failure_url,
      secure3d,
      contextDataId: contextDataId || contextId.value,
      savePaymentInstrument: loadSavePaymentInstrument()
    });

    if (localError.value) {
      error.value = localError.value;
    }

    return response;
  };

  return {
    availableMethods,
    error,
    selectedPaymentMethod,
    storedPaymentInstruments,
    submitDisabled,
    storedContextId: computed(() => contextId.value),
    loadAvailableMethods,
    initForm,
    submitCardForm,
    makePayment,
    setPaymentInstrument,
    setSavePaymentInstrument,
    loadSavePaymentInstrument,
    removePaymentInstrument,
    loadStoredPaymentInstruments
  };
};
export default useCko;
