import { Ref, WritableComputedRef, onBeforeMount, onBeforeUnmount } from '@vue/composition-api';

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import rootStore from '@vue-storefront/core/store';

import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';
import { PERSISTED_CUSTOMER_FIRST_NAME } from '../types/getter';
import { SET_PERSISTED_CUSTOMER_FIRST_NAME } from '../types/mutation';

export function usePersistedFirstName (
  firstName: Ref<string | undefined>
  | WritableComputedRef<string | undefined>
  | undefined
) {
  function fillLastUsedCustomerFirstName () {
    if (!firstName) {
      return;
    }

    firstName.value = rootStore.getters[`${SN_PERSISTED_CUSTOMER_DATA}/${PERSISTED_CUSTOMER_FIRST_NAME}`];
  }

  function persistLastUsedCustomerFirstName (firstName: string | undefined) {
    rootStore.commit(`${SN_PERSISTED_CUSTOMER_DATA}/${SET_PERSISTED_CUSTOMER_FIRST_NAME}`, firstName);
  }

  onBeforeMount(() => {
    fillLastUsedCustomerFirstName();
    EventBus.$on('user-after-loggedin', fillLastUsedCustomerFirstName);
  });

  onBeforeUnmount(() => {
    EventBus.$off('user-after-loggedin', fillLastUsedCustomerFirstName);
  });

  return {
    persistLastUsedCustomerFirstName
  }
}
