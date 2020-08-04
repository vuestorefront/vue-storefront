/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext } from './payment';
import { Configuration } from './configuration';
import { ref } from '@vue/composition-api';
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

enum PaymentMethod {
  NOT_SELECTED = 0,
  CARD,
  SAVED_CARD,
  KLARNA,
  PAYPAL
}

const selectedPaymentMethod = ref(PaymentMethod.NOT_SELECTED);

const useCko = () => {
  const { initCardForm, makePayment: makeCardPayment, error: cardError, submitForm: submitCardForm } = useCkoCard();

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

  const selectPaymentMethod = (paymentMethod: PaymentMethod) => {
    selectedPaymentMethod.value = paymentMethod;
  };

  const makePayment = async ({ cartId, email, contextDataId }) => {
    if (!selectedPaymentMethod.value) {
      error.value = 'Payment method not selected';
      return;
    }

    let finalizeTransactionFunction;
    let localError;

    console.log('XDD', selectedPaymentMethod.value);
    switch (selectedPaymentMethod.value) {
      case PaymentMethod.CARD:
        finalizeTransactionFunction = makeCardPayment;
        localError = cardError;
        break;
      case PaymentMethod.SAVED_CARD:
        finalizeTransactionFunction = () => {
          console.log('Making transaction with saved card...');
        };
        break;
      case PaymentMethod.KLARNA:
        finalizeTransactionFunction = () => {
          console.log('Making transaction with Klarna...');
        };
        break;
      case PaymentMethod.PAYPAL:
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
    makePayment
  };
};
export default useCko;
