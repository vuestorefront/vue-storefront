/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext } from './payment';
import { Configuration } from './configuration';
import { ref } from '@vue/composition-api';
import { CKO_PAYMENT_TYPE } from './helpers';
import useCkoCard from './useCkoCard';

const error = ref(null);
const availableMethods = ref([]);
const contextId = ref(null);

interface PaymentMethods {
  card?: boolean;
  klarna?: boolean;
  paypal?: boolean;
}

interface PaymentMethodsConfig {
  card?: Omit<Configuration, 'publicKey'>;
  klarna?: any;
  paypal?: any;
}

const selectedPaymentMethod = ref(CKO_PAYMENT_TYPE.NOT_SELECTED);

const useCko = () => {
  const { initCardForm, makePayment: makeCardPayment, error: cardError, submitForm: submitCardForm, setPaymentInstrument } = useCkoCard(selectedPaymentMethod);

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
          case 'klarna':
            console.log('Rendering klarna...');
            break;
          case 'paypal':
            console.log('Rendering paypal...');
            break;
        }
      }
    }
  };

  const selectPaymentMethod = (paymentMethod: CKO_PAYMENT_TYPE) => {
    selectedPaymentMethod.value = paymentMethod;
  };

  const makePayment = async ({ cartId, email, contextDataId }) => {
    if (!selectedPaymentMethod.value) {
      error.value = 'Payment method not selected';
      return;
    }

    let finalizeTransactionFunction;
    let localError;

    switch (selectedPaymentMethod.value) {
      case CKO_PAYMENT_TYPE.CREDIT_CARD:
        finalizeTransactionFunction = makeCardPayment;
        localError = cardError;
        break;
      case CKO_PAYMENT_TYPE.SAVED_CARD:
        finalizeTransactionFunction = makeCardPayment;
        localError = cardError;
        break;
      case CKO_PAYMENT_TYPE.KLARNA:
        finalizeTransactionFunction = () => {
          console.log('Making transaction with Klarna...');
        };
        break;
      case CKO_PAYMENT_TYPE.PAYPAL:
        finalizeTransactionFunction = () => {
          console.log('Making transaction with PayPal...');
        };
        break;
      default:
        error.value = 'Not supported payment method';
        return;
    }

    const response = await finalizeTransactionFunction({
      cartId,
      email,
      contextDataId: contextDataId || contextId.value
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
    loadAvailableMethods,
    initForm,
    submitCardForm,
    selectPaymentMethod,
    makePayment,
    setPaymentInstrument
  };
};
export default useCko;
