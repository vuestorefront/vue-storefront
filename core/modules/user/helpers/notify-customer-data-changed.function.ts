import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';

import UserState from '../types/UserState';
import { UserEvents } from 'src/modules/shared';

export function notifyCustomerDataChanged (state: UserState): void {
  if (!state.current) {
    return;
  }

  EventBus.$emit(
    UserEvents.CUSTOMER_DATA_CHANGED,
    {
      customerEmail: state.current.email,
      customerFullName: `${state.current.firstname} ${state.current.lastname}`,
      customerId: state.current.id
    }
  );
}
