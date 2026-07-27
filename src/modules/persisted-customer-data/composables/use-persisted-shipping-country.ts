import { Ref, WritableComputedRef, onBeforeMount } from 'vue';

import rootStore from '@vue-storefront/core/store';

import { PERSISTED_CUSTOMER_SHIPPING_COUNTRY } from '../types/getter';
import { SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY } from '../types/mutation';
import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';

export function usePersistedShippingCountry (
  shippingCountry: Ref<string | undefined>
  | WritableComputedRef<string | undefined>
  | undefined
) {
  function fillLastUsedCustomerShippingCountry () {
    if (!shippingCountry) {
      return;
    }

    shippingCountry.value = rootStore.getters[`${SN_PERSISTED_CUSTOMER_DATA}/${PERSISTED_CUSTOMER_SHIPPING_COUNTRY}`];
  }

  function persistLastUsedCustomerShippingCountry (shippingCountry: string | undefined) {
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY}`, shippingCountry);
  }

  onBeforeMount(() => {
    fillLastUsedCustomerShippingCountry();
  });

  return {
    persistLastUsedCustomerShippingCountry
  }
}
