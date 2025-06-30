import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';

import { UserEvents, PersistedCustomerData } from 'src/modules/shared';

export function notifyCustomerDataChanged (data: PersistedCustomerData): void {
  EventBus.$emit(
    UserEvents.CUSTOMER_DATA_CHANGED,
    data
  );
}
