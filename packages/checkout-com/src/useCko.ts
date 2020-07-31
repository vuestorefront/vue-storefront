/* eslint-disable camelcase, @typescript-eslint/camelcase */

import { createContext } from './payment';
import { ref } from '@vue/composition-api';
// import useCkoCard from './useCkoCard'

const error = ref(null);
const availableMethods = ref([]);

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

  return {
    loadAvailableMethods,
    availableMethods,
    error
  };
};
export default useCko;
