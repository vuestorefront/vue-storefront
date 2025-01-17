import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { UserEvents } from 'src/modules/shared';

import UserState from '../types/UserState';

export function notifyCustomerDataChanged (data: UserState['current']): void {
  if (!data) {
    return;
  }

  EventBus.$emit(
    UserEvents.CUSTOMER_DATA_CHANGED,
    {
      customerEmail: data.email,
      customerFullName: `${data.firstname} ${data.lastname}`,
      customerId: data.id
    }
  );
}
