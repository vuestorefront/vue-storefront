import { Ref, WritableComputedRef, onBeforeMount, onBeforeUnmount } from '@vue/composition-api';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import rootStore from '@vue-storefront/core/store';

import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';
import { PERSISTED_CUSTOMER_VAT_ID } from '../types/getter';
import { SET_PERSISTED_CUSTOMER_VAT_ID } from '../types/mutation';

export function usePersistedVatId (
  vatId: Ref<string | undefined>
  | WritableComputedRef<string | undefined>
  | undefined
) {
  function fillLastUsedCustomerVatId () {
    if (!vatId || vatId.value) {
      return;
    }

    vatId.value = rootStore.getters[`${SN_PERSISTED_CUSTOMER_DATA}/${PERSISTED_CUSTOMER_VAT_ID}`];
  }

  function persistLastUsedCustomerVatId (vatId: string | undefined) {
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_VAT_ID}`, vatId);
  }

  onBeforeMount(() => {
    fillLastUsedCustomerVatId();
    EventBus.$on('user-after-loggedin', fillLastUsedCustomerVatId);
  });

  onBeforeUnmount(() => {
    EventBus.$off('user-after-loggedin', fillLastUsedCustomerVatId);
  });

  return {
    persistLastUsedCustomerVatId
  }
}
