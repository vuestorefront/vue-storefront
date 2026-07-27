import { Ref, WritableComputedRef, onBeforeMount } from 'vue';

import rootStore from '@vue-storefront/core/store';

import { PERSISTED_CUSTOMER_PHONE_NUMBER } from '../types/getter';
import { SET_PERSISTED_CUSTOMER_PHONE_NUMBER } from '../types/mutation';
import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';

export function usePersistedPhoneNumber (
  phoneNumber: Ref<string | undefined>
  | WritableComputedRef<string | undefined>
  | undefined
) {
  function fillLastUsedCustomerPhoneNumber () {
    if (!phoneNumber) {
      return;
    }

    phoneNumber.value = rootStore.getters[`${SN_PERSISTED_CUSTOMER_DATA}/${PERSISTED_CUSTOMER_PHONE_NUMBER}`];
  }

  function persistLastUsedCustomerPhoneNumber (phoneNumber: string | undefined) {
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_PHONE_NUMBER}`, phoneNumber);
  }

  onBeforeMount(() => {
    fillLastUsedCustomerPhoneNumber();
  });

  return {
    persistLastUsedCustomerPhoneNumber
  }
}
