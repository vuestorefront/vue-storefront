/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext } from './payment';
import { ref } from '@vue/composition-api';
import useCkoCard from './useCkoCard';

const error = ref(null);
const availableMethods = ref([]);

interface PaymentMethods {
  card: boolean;
  klarna: boolean;
  paypal: boolean;
}

interface PaymentMethodsConfig {
  card: object;
  klarna: object;
  paypal: object;
}

const useCko = () => {
  const loadAvailableMethods = async (reference) => {
    try {
      const response = await createContext({ reference });
      availableMethods.value = [
        ...response.data.apms.map(apm => apm.name),
        'card'
      ];
      return response.data;
    } catch (e) {
      error.value = e;
      return null;
    }
  };

  const initForm = (initMethods: PaymentMethods | object = {}, config: PaymentMethodsConfig | object = {}) => {
    const hasSpecifiedMethods = Object.keys(initMethods).length > 0;
    const { initCardForm } = useCkoCard();

    for (const method of availableMethods.value) {
      if (!hasSpecifiedMethods || initMethods[method]) {
        const methodConfig = config[method];
        switch (method) {
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

  return {
    loadAvailableMethods,
    availableMethods,
    error,
    initForm
  };
};
export default useCko;
